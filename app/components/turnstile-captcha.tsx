"use client"

import { useEffect, useRef, useState } from "react"

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void
  onError: () => void
}

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback': () => void
          'error-callback': () => void
          theme?: 'light' | 'dark'
          size?: 'normal' | 'compact'
        }
      ) => void
    }
  }
}

export function TurnstileCaptcha({ onVerify, onError }: TurnstileCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      setIsLoaded(true)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src*="turnstile"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (isLoaded && containerRef.current && !isVerified) {
      try {
        window.turnstile.render(containerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          callback: (token: string) => {
            setIsVerified(true)
            onVerify(token)
          },
          'expired-callback': () => {
            setIsVerified(false)
            onError()
          },
          'error-callback': () => {
            setIsVerified(false)
            onError()
          },
          theme: 'light',
          size: 'normal',
        })
      } catch (error) {
        console.error('Turnstile render error:', error)
        onError()
      }
    }
  }, [isLoaded, onVerify, onError, isVerified])

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700">
        Verify you're human <span className="text-red-500">*</span>
      </div>
      <div 
        ref={containerRef} 
        className="w-full flex justify-center"
        suppressHydrationWarning
      />
      {!isLoaded && (
        <div className="flex items-center justify-center h-10 w-full rounded-md border border-input bg-background px-3 py-2">
          <div className="text-sm text-gray-500">Loading security verification...</div>
        </div>
      )}
      <style jsx>{`
        .cf-turnstile {
          width: 100% !important;
        }
        .cf-turnstile iframe {
          width: 100% !important;
        }
      `}</style>
    </div>
  )
} 