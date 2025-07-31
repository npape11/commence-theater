import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (for production, use Redis or Upstash)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5   // Max 5 requests per minute

function getRateLimitKey(request: NextRequest): string {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  return `rate_limit:${ip}`
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // === Security Headers ===
  const CSP = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https: wss://*.supabase.co https://*.supabase.co https://challenges.cloudflare.com;
    frame-src 'self' https://challenges.cloudflare.com;
  `.replace(/\s{2,}/g, ' ').trim()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Content-Security-Policy', CSP)

  // === API Rate Limiting ===
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitKey = getRateLimitKey(request)

    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Add rate limit headers
    const record = rateLimitStore.get(rateLimitKey)
    if (record) {
      response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
      response.headers.set('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX_REQUESTS - record.count).toString())
      response.headers.set('X-RateLimit-Reset', new Date(record.resetTime).toISOString())
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
