import { Navbar } from "./components/navbar"
import { HeroSection } from "./components/hero-section"
import { ProblemSection } from "./components/problem-section"
import { FeaturesSection } from "./components/features-section"
import { WaitlistSection } from "./components/waitlist-section"
import { AboutSection } from "./components/about-section"
import { FooterSection } from "./components/footer-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-x-hidden">
      <div className="max-w-[100vw]">
        <Navbar />

        <HeroSection />

        <ProblemSection />

        <div className="mb-24">
          <FeaturesSection />
        </div>

        <WaitlistSection />

        <AboutSection />

        <FooterSection />
      </div>
    </div>
  )
}
