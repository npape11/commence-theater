"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import { TurnstileCaptcha } from "./turnstile-captcha"

import { supabase } from "@/lib/supabase-client"

interface FormData {
  name: string
  email: string
  company: string
  tier: string
}

interface ValidationErrors {
  name?: string
  email?: string
  company?: string
  tier?: string
  captcha?: string
}

export function WaitlistForm() {
  const [isMounted, setIsMounted] = useState(false)
  const [foundersRemaining, setFoundersRemaining] = useState(100)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    tier: "",
  })
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    setIsMounted(true)

    // Function to fetch and update counts
    async function updateCounts() {
      try {
        const { count: foundersCount } = await supabase
          .from("waitlist")
          .select("id", { count: "exact", head: true })
          .eq("founders", true)

        const remaining = Math.max(0, 100 - (foundersCount || 0))
        setFoundersRemaining(remaining)
      } catch (error) {
        console.error("Error fetching founders count:", error)
      }
    }

    // Get initial count
    updateCounts()

    // Subscribe to changes
    const channel = supabase
      .channel("waitlist-form-founders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waitlist",
          filter: "founders=true"
        },
        // Update counts when any change occurs
        () => updateCounts()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {}

    if (!formData.name.trim()) {
      errors.name = "Full Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address"
      }
    }

    if (!formData.company.trim()) {
      errors.company = "Theater/Organization Name is required"
    }

    if (!formData.tier) {
      errors.tier = "Theater Size is required"
    }

    if (!captchaToken) {
      errors.captcha = "Security verification is required"
    }

    return errors
  }

  const getFirstMissingField = (errors: ValidationErrors): string => {
    if (errors.name) return "Full Name"
    if (errors.email) return "Email"
    if (errors.company) return "Theater/Organization Name"
    if (errors.tier) return "Theater Size"
    if (errors.captcha) return "Security Verification"
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setValidationErrors({})

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      const firstMissingField = getFirstMissingField(errors)
      setMessage({
        type: "error",
        text: `Please fill out the ${firstMissingField} field.`,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest", // CSRF protection header
        },
        credentials: "same-origin", // Include cookies for CSRF protection
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({
          type: "success",
          text: result.message,
        })
        setFormData({ name: "", email: "", company: "", tier: "" })
        setCaptchaToken("")
        setValidationErrors({})
      } else {
        setMessage({
          type: "error",
          text: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })

    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: undefined })
    }

    if (message?.type === "error") {
      setMessage(null)
    }
  }

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token)
    if (validationErrors.captcha) {
      setValidationErrors({ ...validationErrors, captcha: undefined })
    }
    if (message?.type === "error") {
      setMessage(null)
    }
  }

  const handleCaptchaError = () => {
    setCaptchaToken("")
    setValidationErrors({ ...validationErrors, captcha: "Security verification failed. Please try again." })
  }



  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">Join the Theater Revolution</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Be among the first to experience theater management software built for the modern age
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              disabled={isSubmitting}
              className={validationErrors.name ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={!!validationErrors.name}
              aria-describedby={validationErrors.name ? "name-error" : undefined}
              suppressHydrationWarning
            />
            {validationErrors.name && (
              <p id="name-error" className="text-sm text-red-600">
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              disabled={isSubmitting}
              className={validationErrors.email ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={!!validationErrors.email}
              aria-describedby={validationErrors.email ? "email-error" : undefined}
              suppressHydrationWarning
            />
            {validationErrors.email && (
              <p id="email-error" className="text-sm text-red-600">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              Theater/Organization Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="e.g., Metropolitan Theater Company"
              className={validationErrors.company ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={!!validationErrors.company}
              aria-describedby={validationErrors.company ? "company-error" : undefined}
              suppressHydrationWarning
            />
            {validationErrors.company && (
              <p id="company-error" className="text-sm text-red-600">
                {validationErrors.company}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier">
              Theater Size <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.tier}
              onValueChange={(value) => handleInputChange("tier", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={validationErrors.tier ? "border-red-500 focus:border-red-500" : ""}
                aria-invalid={!!validationErrors.tier}
                aria-describedby={validationErrors.tier ? "tier-error" : undefined}
                suppressHydrationWarning
              >
                <SelectValue placeholder="Select your theater size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small Theater (Under 200 seats)</SelectItem>
                <SelectItem value="Medium">Medium Theater (200-800 seats)</SelectItem>
                <SelectItem value="Large">Large Theater (800+ seats)</SelectItem>
                <SelectItem value="Multiple">Multiple Venues</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.tier && (
              <p id="tier-error" className="text-sm text-red-600">
                {validationErrors.tier}
              </p>
            )}
          </div>

          {/* Turnstile Captcha */}
          <TurnstileCaptcha
            onVerify={handleCaptchaVerify}
            onError={handleCaptchaError}
          />
          {validationErrors.captcha && (
            <p className="text-sm text-red-600">
              {validationErrors.captcha}
            </p>
          )}

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting} suppressHydrationWarning>
            {isSubmitting ? "Joining..." : "Join the Waitlist"}
          </Button>
        </form>

        {message && (
          <Alert className={`mt-4 ${message.type === "success" ? "border-green-500" : "border-red-500"}`}>
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-700" : "text-red-700"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
