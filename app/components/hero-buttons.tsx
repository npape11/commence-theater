"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroButtons() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4">
      <Button 
        size="lg" 
        className="text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 bg-purple-600 hover:bg-purple-700 min-w-[200px] sm:min-w-[220px]" 
        onClick={scrollToWaitlist}
      >
        Get Early Access
        <ArrowRight className="ml-3 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent min-w-[200px] sm:min-w-[220px]"
      >
        Watch Demo
      </Button>
    </div>
  )
}
