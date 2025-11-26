import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy } from "lucide-react"

export function ProgramsSection() {
  const programs = [
    {
      title: "Youth Classes",
      description: "Free weekly classes for ages 8-18, covering fundamental skills to advanced techniques.",
      icon: Users,
      gradient: "from-primary/20 to-amber-500/20",
      iconBg: "gradient-primary",
    },
    {
      title: "Summer Camps",
      description: "Intensive week-long camps combining fencing training with fun activities and team building.",
      icon: Calendar,
      gradient: "from-secondary/20 to-purple-500/20",
      iconBg: "gradient-accent",
    },
    {
      title: "Competition Training",
      description: "Advanced training for students ready to compete at local and regional tournaments.",
      icon: Trophy,
      gradient: "from-accent/20 to-orange-500/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Our Free <span className="gradient-text">Programs</span>
        </h2>
        <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
          All programs are completely free and open to everyone, regardless of experience or background
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <div
                key={index}
                className={`relative group hover-lift rounded-3xl overflow-hidden bg-gradient-to-br ${program.gradient} backdrop-blur-sm`}
              >
                <div className="gradient-card absolute inset-0 opacity-50" />
                <div className="relative p-8 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl ${program.iconBg} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{program.title}</h3>
                  <p className="text-foreground/70 leading-relaxed flex-grow">{program.description}</p>
                </div>
                <div className="absolute inset-0 border border-border/20 rounded-3xl group-hover:border-primary/30 transition-colors pointer-events-none" />
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/programs">
            <Button
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary rounded-full px-8 h-12 font-medium bg-card/30 backdrop-blur-sm transition-all"
            >
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
