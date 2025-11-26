import Image from "next/image"

export function PhotoSection() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium mb-6">Our Community</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See the impact we're making in communities across the nation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative h-80 bg-white/5 rounded-lg overflow-hidden group">
              <Image
                src={`/fencing-class-students-learning--diverse-group--in.jpg?height=400&width=600&query=fencing class students learning, diverse group, indoor facility, image ${item}`}
                alt={`Community photo ${item}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
