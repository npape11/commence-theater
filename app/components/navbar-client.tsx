"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function NavbarClient() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation Links */}
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

      {/* Desktop CTA Button */}
      <div className="hidden md:flex items-center">
        <Button 
          onClick={isMounted ? scrollToWaitlist : undefined}
          className="bg-purple-600 hover:bg-purple-700"
          suppressHydrationWarning
        >
          Get Started
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          suppressHydrationWarning
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={isMounted ? scrollToFeatures : undefined}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              suppressHydrationWarning
            >
              Features
            </button>
            <button 
              onClick={isMounted ? scrollToWaitlist : undefined}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              suppressHydrationWarning
            >
              Join Waitlist
            </button>
            <button 
              onClick={isMounted ? scrollToAbout : undefined}
              className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              suppressHydrationWarning
            >
              About
            </button>
            <div className="pt-2">
              <Button 
                onClick={isMounted ? scrollToWaitlist : undefined}
                className="w-full bg-purple-600 hover:bg-purple-700"
                suppressHydrationWarning
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
