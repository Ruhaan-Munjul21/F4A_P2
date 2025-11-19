import { MinimalHeader } from "@/components/minimal-header"
import { HomeHero } from "@/components/home-hero"
import { ImpactNumbers } from "@/components/impact-numbers"
import { ImpactAction } from "@/components/impact-action"
import { MissionSection } from "@/components/mission-section"
import { ProgramsSection } from "@/components/programs-section"
import { MiniGallery } from "@/components/mini-gallery"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <MinimalHeader />
      <main className="relative">
        <HomeHero />
        <ImpactNumbers />
        <ImpactAction />
        <MissionSection />
        <ProgramsSection />
        <MiniGallery />
      </main>
    </div>
  )
}
