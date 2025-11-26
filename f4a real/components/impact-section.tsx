import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function ImpactSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Parent",
      quote:
        "This program has completely transformed my daughter's confidence. She's not just learning fencing—she's learning discipline, respect, and perseverance.",
      image: "/parent-headshot.jpg",
    },
    {
      name: "Marcus J.",
      role: "Student, Age 15",
      quote:
        "I never thought I could compete at the state level. Thanks to Fencing for Everyone, I earned my first medal and a chance at a college scholarship.",
      image: "/teen-athlete-headshot.jpg",
    },
    {
      name: "Coach Williams",
      role: "School Administrator",
      quote:
        "Having this program at our school has been incredible. Students who participate show improved focus and grades across all their classes.",
      image: "/coach-headshot.jpg",
    },
  ]

  return (
    <section id="impact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Impact</h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Real stories from students, families, and communities we've served.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 mb-4" style={{ color: "#FACC14" }} />
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-black text-white p-8 rounded-lg">
            <div className="text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              85%
            </div>
            <p className="text-lg">of students report improved academic performance after joining our programs</p>
          </div>
          <div className="bg-black text-white p-8 rounded-lg">
            <div className="text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              40+
            </div>
            <p className="text-lg">college scholarships earned by our alumni in the past 3 years</p>
          </div>
          <div className="bg-black text-white p-8 rounded-lg">
            <div className="text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              92%
            </div>
            <p className="text-lg">of families say their child has gained valuable life skills through fencing</p>
          </div>
          <div className="bg-black text-white p-8 rounded-lg">
            <div className="text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              100%
            </div>
            <p className="text-lg">of equipment costs are covered for students who need financial assistance</p>
          </div>
        </div>
      </div>
    </section>
  )
}
