"use client"

import { useEffect, useRef, useState } from "react"

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void
  onError: () => void
}

declare global {
  interface Window {
    turnstile?: {
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
      ) => string
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export function TurnstileCaptcha({ onVerify, onError }: TurnstileCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>("")
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const scriptId = 'cf-turnstile-script'

  // Load script
  useEffect(() => {
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      setIsScriptLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.id = scriptId
    script.async = true
    script.defer = true
    script.onload = () => setIsScriptLoaded(true)
    document.head.appendChild(script)

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = ""
        } catch (error) {
          console.error('Error removing Turnstile widget:', error)
        }
      }
    }
  }, [])

  // Render widget (only once)
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current || !window.turnstile) return

    // Prevent duplicate renders
    if (widgetIdRef.current) return

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onVerify,
        'expired-callback': onError,
        'error-callback': onError,
        theme: 'light',
        size: 'normal',
      })
    } catch (error) {
      console.error('Error rendering Turnstile:', error)
      onError()
    }
  }, [isScriptLoaded, onVerify, onError])

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
      {!isScriptLoaded && (
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
