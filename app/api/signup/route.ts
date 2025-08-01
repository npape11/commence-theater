import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-server"
import { env } from "@/lib/env"

interface SignupData {
  name: string
  email: string
  company: string
  tier: string
  captchaToken: string
}

interface ValidationError {
  field: string
  message: string
}

async function verifyTurnstileToken(token: string, remoteip?: string): Promise<boolean> {
  try {
    const formData = new FormData()
    formData.append("secret", env.TURNSTILE_SECRET_KEY)
    formData.append("response", token)
    if (remoteip) {
      formData.append("remoteip", remoteip)
    }

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    const result = await fetch(url, {
      method: "POST",
      body: formData,
    })

    const outcome = await result.json()
    return outcome.success === true
  } catch (error) {
    console.error("Turnstile verification error:", error)
    return false
  }
}

function validateSignupData(data: Omit<SignupData, 'captchaToken'>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Full Name is required" })
  }

  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" })
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(data.email)) {
      errors.push({ field: "email", message: "Please enter a valid email address" })
    }
  }

  if (!data.company?.trim()) {
    errors.push({ field: "company", message: "Theater/Organization Name is required" })
  }

  if (!data.tier?.trim()) {
    errors.push({ field: "tier", message: "Theater Size is required" })
  }

  return errors
}

function getValidationErrorMessage(errors: ValidationError[]): string {
  if (errors.length === 1) {
    return errors[0].message
  }

  const fieldNames = errors.map((error) => {
    switch (error.field) {
      case "name":
        return "Full Name"
      case "email":
        return "Email"
      case "company":
        return "Theater/Organization Name"
      case "tier":
        return "Theater Size"
      default:
        return error.field
    }
  })

  if (fieldNames.length === 2) {
    return `${fieldNames[0]} and ${fieldNames[1]} are required`
  }

  const lastField = fieldNames.pop()
  return `${fieldNames.join(", ")}, and ${lastField} are required`
}

export async function POST(request: NextRequest) {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }

    // Validate content type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 })
    }

    // Basic CSRF protection - check for AJAX request header
    const requestedWith = request.headers.get('x-requested-with')
    if (!requestedWith || requestedWith !== 'XMLHttpRequest') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 403 })
    }

    const body = await request.json()
    const { name, email, company, tier, captchaToken } = body as SignupData

    // Validate all required fields
    const validationErrors = validateSignupData({ name, email, company, tier })
    if (validationErrors.length > 0) {
      return NextResponse.json({ error: getValidationErrorMessage(validationErrors) }, { status: 400 })
    }

    // Validate captcha token
    if (!captchaToken) {
      return NextResponse.json({ error: "Security verification is required" }, { status: 400 })
    }

    // Get client IP for additional security
    const clientIp = request.headers.get('CF-Connecting-IP')

    // Verify captcha token
    const isValidToken = await verifyTurnstileToken(
      captchaToken,
      clientIp || undefined
    )

    if (!isValidToken) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 })
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = name.trim().replace(/[<>]/g, '')
    const sanitizedEmail = email.trim().toLowerCase().replace(/[<>]/g, '')
    const sanitizedCompany = company.trim().replace(/[<>]/g, '')

    // Use service role key ONLY in API routes for database writes
    // Check current founders count
    const { count: foundersCount } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("founders", true)

    const isFounder = (foundersCount || 0) < 100

    // Insert new waitlist entry
    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert([
        {
          name: sanitizedName,
          email: sanitizedEmail,
          company: sanitizedCompany,
          tier,
          founders: isFounder,
          client_ip: clientIp || null,
        },
      ])
      .select()

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json({ error: "This email is already registered" }, { status: 409 })
      }
      // Log the actual error for debugging but don't expose it to client
      console.error("Database error:", error)
      return NextResponse.json({ error: "Registration failed. Please try again later." }, { status: 500 })
    }

    const welcomeMessage = isFounder
      ? `Welcome to the Theater Founders Club, ${sanitizedName}! We'll be in touch soon with exclusive updates about ${sanitizedCompany}.`
      : `Thank you for joining our waitlist, ${sanitizedName}! We'll notify you when ${sanitizedCompany} can access our theater management platform.`

    return NextResponse.json({
      success: true,
      founders: isFounder,
      message: welcomeMessage,
    })
  } catch (error) {
    // Log the actual error for debugging but don't expose it to client
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Registration failed. Please try again later." }, { status: 500 })
  }
}
