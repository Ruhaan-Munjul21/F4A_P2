import { MinimalHeader } from "@/components/minimal-header"
import { ProgramsDetailSection } from "@/components/programs-detail-section"
import { ScheduleSection } from "@/components/schedule-section"
import { LocationsSection } from "@/components/locations-section"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#252525]">
      <MinimalHeader />
      <main>
        <ProgramsDetailSection />
        <ScheduleSection />
        <LocationsSection />
      </main>
    </div>
  )
}
