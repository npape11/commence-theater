import { Building2, Users, TrendingUp } from "lucide-react"
import { FoundersBadgeHybrid } from "./founders-badge-hybrid"
import { HeroButtons } from "./hero-buttons"

interface HeroSectionProps {
  foundersClaimed: number
  foundersRemaining: number
}

export function HeroSection({ foundersClaimed, foundersRemaining }: HeroSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
            <Building2 className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          The Future of{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Theater Management
          </span>{" "}
          is Here
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
          Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM
          built specifically for the performing arts industry.
        </p>

        {/* Client component only for button interactions */}
        <HeroButtons />

        {/* Hybrid component - server rendered initially, then real-time updates */}
        <div className="max-w-md mx-auto mb-12 sm:mb-16 px-4">
          <FoundersBadgeHybrid initialClaimed={foundersClaimed} initialRemaining={foundersRemaining} />
        </div>

        {/* Static social proof - Server rendered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto text-center px-4">
          <div>
            <div className="flex justify-center mb-2">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">500+</div>
            <div className="text-xs sm:text-sm text-gray-600">Theaters Interested</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">25+</div>
            <div className="text-xs sm:text-sm text-gray-600">Years CRM Experience</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">30%</div>
            <div className="text-xs sm:text-sm text-gray-600">Average Revenue Increase</div>
          </div>
        </div>
      </div>
    </section>
  )
}
