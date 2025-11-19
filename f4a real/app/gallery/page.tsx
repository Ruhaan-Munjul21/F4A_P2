import { MinimalHeader } from "@/components/minimal-header"
import { GalleryHero } from "@/components/gallery-hero"
import { MediaGallery } from "@/components/media-gallery"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#252525]">
      <MinimalHeader />
      <main>
        <GalleryHero />
        <MediaGallery />
      </main>
    </div>
  )
}
