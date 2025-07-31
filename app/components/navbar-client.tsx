"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function NavbarClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={isMounted ? scrollToFeatures : undefined}
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          suppressHydrationWarning
        >
          Features
        </button>
        <button 
          onClick={isMounted ? scrollToWaitlist : undefined}
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          suppressHydrationWarning
        >
          Join Waitlist
        </button>
        <button 
          onClick={isMounted ? scrollToAbout : undefined}
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          suppressHydrationWarning
        >
          About
        </button>
      </div>

      {/* CTA Button */}
      <div className="flex items-center">
        <Button 
          onClick={isMounted ? scrollToWaitlist : undefined}
          className="bg-purple-600 hover:bg-purple-700"
          suppressHydrationWarning
        >
          Get Started
        </Button>
      </div>
    </>
  )
}
