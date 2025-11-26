import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function MiniGallery() {
  const images = [
    { src: "/fencing-students-practicing.jpg", alt: "Students practicing" },
    { src: "/fencing-competition-action.jpg", alt: "Competition action" },
    { src: "/fencing-coach-teaching.jpg", alt: "Coach teaching" },
    { src: "/fencing-students-celebrating.jpg", alt: "Students celebrating" },
  ]

  return (
    <section className="py-20 px-6 lg:px-12 bg-white/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">See Us in Action</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Moments from our classes, competitions, and community events
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery">
            <Button className="bg-[#FACC14] text-black hover:bg-[#FACC14]/90 rounded-full px-8 h-12 font-medium">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
