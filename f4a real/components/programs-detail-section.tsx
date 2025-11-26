import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, Clock, Award } from "lucide-react"

export function ProgramsDetailSection() {
  const programs = [
    {
      title: "Youth Classes",
      description:
        "Our flagship program offering comprehensive fencing instruction for ages 8-18. Students learn proper technique, footwork, and strategy while building confidence and discipline.",
      details: [
        { icon: Calendar, label: "Year-round program" },
        { icon: Clock, label: "3 sessions per week" },
        { icon: Users, label: "Small class sizes (max 12)" },
        { icon: Award, label: "All skill levels welcome" },
      ],
      image: "/youth-fencing-class-instruction.jpg",
    },
    {
      title: "Summer Camps",
      description:
        "Intensive week-long camps during summer break combining technical training, games, and competitions. A perfect introduction to fencing or skill enhancement for existing students.",
      details: [
        { icon: Calendar, label: "June - August" },
        { icon: Clock, label: "Full day (9am-4pm)" },
        { icon: Users, label: "Ages 8-16" },
        { icon: Trophy, label: "End-of-week tournament" },
      ],
      image: "/summer-fencing-camp-kids.jpg",
    },
    {
      title: "Competition Training",
      description:
        "Advanced program for students ready to compete at local, regional, and national tournaments. Includes tournament preparation, mental training, and competitive strategy.",
      details: [
        { icon: Calendar, label: "Ongoing enrollment" },
        { icon: Clock, label: "4+ sessions per week" },
        { icon: Users, label: "Invitation or coach approval" },
        { icon: Trophy, label: "Tournament travel included" },
      ],
      image: "/competitive-fencing-tournament.jpg",
    },
  ]

  return (
    <section className="pt-32 pb-20 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Our Programs</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Three pathways to excellence in fencing, all completely free and open to everyone
          </p>
        </div>

        <div className="space-y-20">
          {programs.map((program, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-4xl font-bold text-white mb-4">{program.title}</h2>
                <p className="text-white/70 leading-relaxed mb-6">{program.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {program.details.map((detail, idx) => {
                    const Icon = detail.icon
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#FACC14] flex-shrink-0" />
                        <span className="text-white/70 text-sm">{detail.label}</span>
                      </div>
                    )
                  })}
                </div>

                <Link href="/register">
                  <Button className="bg-[#FACC14] text-black hover:bg-[#FACC14]/90 rounded-full px-8 h-12 font-medium">
                    Register for This Program
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
