import { WaitlistForm } from "./waitlist-form"

interface WaitlistSectionProps {
  foundersRemaining: number
}

export function WaitlistSection({ foundersRemaining }: WaitlistSectionProps) {
  return (
    <section id="waitlist" className="container mx-auto px-4 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Join the Theater Revolution</h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Be among the first theater professionals to experience a CRM built specifically for your industry. Founders
          Club members get exclusive early access and special pricing.
        </p>
      </div>

      <WaitlistForm foundersRemaining={foundersRemaining} />
    </section>
  )
}
