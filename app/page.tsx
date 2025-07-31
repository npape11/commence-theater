import { supabaseAdmin } from "@/lib/supabase-server"
import { Navbar } from "./components/navbar"
import { HeroSection } from "./components/hero-section"
import { ProblemSection } from "./components/problem-section"
import { FeaturesSection } from "./components/features-section"
import { WaitlistSection } from "./components/waitlist-section"
import { AboutSection } from "./components/about-section"
import { FooterSection } from "./components/footer-section"

async function getFoundersCount() {
  try {
    const { count } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("founders", true)

    return {
      count: count || 0,
      remaining: Math.max(0, 100 - (count || 0)),
    }
  } catch (error) {
    console.error("Error fetching founders count:", error)
    return { count: 0, remaining: 100 }
  }
}

export default async function Home() {
  const { count: foundersClaimed, remaining: foundersRemaining } = await getFoundersCount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-x-hidden">
      <div className="max-w-[100vw]">
        <Navbar />

        <HeroSection foundersClaimed={foundersClaimed} foundersRemaining={foundersRemaining} />

        <ProblemSection />

        <div className="mb-24">
          <FeaturesSection />
        </div>

        <WaitlistSection foundersRemaining={foundersRemaining} />

        <AboutSection />

        <FooterSection />
      </div>
    </div>
  )
}
