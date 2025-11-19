"use client"

import { useState } from "react"
import Image from "next/image"

export function MediaGallery() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", label: "All" },
    { id: "classes", label: "Classes" },
    { id: "competitions", label: "Competitions" },
    { id: "events", label: "Events" },
  ]

  const media = [
    { src: "/fencing-students-practicing.jpg", category: "classes" },
    { src: "/fencing-competition-action-shot.jpg", category: "competitions" },
    { src: "/fencing-community-event.jpg", category: "events" },
    { src: "/fencing-coach-teaching-technique.jpg", category: "classes" },
    { src: "/fencing-tournament-victory-celebration.jpg", category: "competitions" },
    { src: "/placeholder.svg?height=600&width=800", category: "events" },
    { src: "/placeholder.svg?height=600&width=800", category: "classes" },
    { src: "/placeholder.svg?height=600&width=800", category: "competitions" },
    { src: "/placeholder.svg?height=600&width=800", category: "events" },
    { src: "/placeholder.svg?height=600&width=800", category: "classes" },
    { src: "/placeholder.svg?height=600&width=800", category: "competitions" },
    { src: "/placeholder.svg?height=600&width=800", category: "events" },
  ]

  const filteredMedia = filter === "all" ? media : media.filter((item) => item.category === filter)

  return (
    <section className="pb-20 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category.id
                  ? "bg-[#FACC14] text-black"
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, index) => (
            <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-medium">View Full Size</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
