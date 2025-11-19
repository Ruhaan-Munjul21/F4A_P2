import { MinimalHeader } from "@/components/minimal-header"
import { AboutHero } from "@/components/about-hero"
import { CoachesSection } from "@/components/coaches-section"
import { ImpactNumbers } from "@/components/impact-numbers"
import { PartnersSection } from "@/components/partners-section"
import { WhyWeStarted } from "@/components/why-we-started"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#252525]">
      <MinimalHeader />
      <main>
        <AboutHero />
        <CoachesSection />
        <ImpactNumbers />
        <PartnersSection />
        <WhyWeStarted />
        <TestimonialsSection />
      </main>
    </div>
  )
}
