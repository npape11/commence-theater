import { Building2, Users, TrendingUp } from "lucide-react"
import { FoundersBadgeHybrid } from "./founders-badge-hybrid"
import { HeroButtons } from "./hero-buttons"

interface HeroSectionProps {
  foundersClaimed: number
  foundersRemaining: number
}

export function HeroSection({ foundersClaimed, foundersRemaining }: HeroSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-purple-100 rounded-full">
            <Building2 className="h-12 w-12 text-purple-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          The Future of{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Theater Management
          </span>{" "}
          is Here
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM
          built specifically for the performing arts industry.
        </p>

        {/* Client component only for button interactions */}
        <HeroButtons />

        {/* Hybrid component - server rendered initially, then real-time updates */}
        <div className="max-w-md mx-auto mb-16">
          <FoundersBadgeHybrid initialClaimed={foundersClaimed} initialRemaining={foundersRemaining} />
        </div>

        {/* Static social proof - Server rendered */}
        <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
          <div>
            <div className="flex justify-center mb-2">
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Theaters Interested</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-600">Years CRM Experience</div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">30%</div>
            <div className="text-sm text-gray-600">Average Revenue Increase</div>
          </div>
        </div>
      </div>
    </section>
  )
}
