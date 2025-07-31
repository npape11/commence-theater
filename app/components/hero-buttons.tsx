"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroButtons() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <Button size="lg" className="text-lg px-8 py-3 bg-purple-600 hover:bg-purple-700" onClick={scrollToWaitlist}>
        Get Early Access
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="text-lg px-8 py-3 border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
      >
        Watch Demo
      </Button>
    </div>
  )
}
