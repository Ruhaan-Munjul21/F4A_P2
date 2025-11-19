import { MinimalHeader } from "@/components/minimal-header"
import { DonateSection } from "@/components/donate-section"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#252525]">
      <MinimalHeader />
      <main>
        <DonateSection />
      </main>
    </div>
  )
}
