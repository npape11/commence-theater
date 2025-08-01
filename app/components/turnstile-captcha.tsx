"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void
  onError: () => void
}

export interface TurnstileCaptchaHandle {
  reset: () => void
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
      reset: (widgetId?: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export const TurnstileCaptcha = forwardRef<TurnstileCaptchaHandle, TurnstileCaptchaProps>(
  ({ onVerify, onError }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<string>("")
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    const scriptId = 'cf-turnstile-script'

    const stableOnVerify = useRef(onVerify)
    const stableOnError = useRef(onError)

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current)
          } catch (err) {
            console.error("Error resetting Turnstile:", err)
          }
        }
      }
    }))

    useEffect(() => {
      stableOnVerify.current = onVerify
      stableOnError.current = onError
    }, [onVerify, onError])

    useEffect(() => {
      if (!TURNSTILE_SITE_KEY) {
        console.error("Missing Turnstile site key")
        stableOnError.current()
        return
      }

      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        setIsScriptLoaded(true)
      } else {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        script.id = scriptId
        script.async = true
        script.defer = true
        script.onload = () => setIsScriptLoaded(true)
        document.head.appendChild(script)
      }

      const timeout = setTimeout(() => {
        if (!window.turnstile) {
          console.error("Turnstile script failed to load")
          stableOnError.current()
        }
      }, 5000)

      return () => {
        clearTimeout(timeout)

        if (widgetIdRef.current && window.turnstile?.remove) {
          try {
            window.turnstile.remove(widgetIdRef.current)
            widgetIdRef.current = ""
          } catch (error) {
            console.error('Error removing Turnstile widget:', error)
          }
        }

        const script = document.getElementById(scriptId)
        if (script && script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }, [])

    useEffect(() => {
      if (!isScriptLoaded || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current) return

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => stableOnVerify.current(token),
          'expired-callback': () => stableOnError.current(),
          'error-callback': () => stableOnError.current(),
          theme: 'light',
          size: 'normal',
        })
      } catch (error) {
        console.error('Error rendering Turnstile:', error)
        stableOnError.current()
      }
    }, [isScriptLoaded])

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
)

TurnstileCaptcha.displayName = "TurnstileCaptcha"
