import Image from "next/image"

export function CoachesSection() {
  const coaches = [
    {
      name: "Coach Sarah Martinez",
      title: "Head Coach & Founder",
      bio: "Former Olympic team alternate with 15 years of coaching experience",
      image: "/female-fencing-coach-professional.jpg",
    },
    {
      name: "Coach David Chen",
      title: "Youth Development Director",
      bio: "NCAA champion and certified USA Fencing coach specializing in beginners",
      image: "/male-fencing-coach-teaching.jpg",
    },
    {
      name: "Coach Maria Rodriguez",
      title: "Competition Coach",
      bio: "National medalist with expertise in competitive strategy and mental training",
      image: "/female-fencing-coach-competitive.jpg",
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Meet Our Coaches</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coaches.map((coach, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src={coach.image || "/placeholder.svg"} alt={coach.name} fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{coach.name}</h3>
              <p className="text-[#FACC14] mb-3 font-medium">{coach.title}</p>
              <p className="text-white/70 leading-relaxed">{coach.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
