import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, Calendar, Mail } from "lucide-react"

export function GetInvolvedSection() {
  const ways = [
    {
      icon: DollarSign,
      title: "Donate",
      description:
        "Your contribution directly supports scholarships, equipment, and facility access for students in need.",
      cta: "Make a Donation",
    },
    {
      icon: Users,
      title: "Volunteer",
      description: "Share your time and skills as a coach, mentor, or event organizer to help our programs thrive.",
      cta: "Volunteer Today",
    },
    {
      icon: Calendar,
      title: "Host an Event",
      description: "Partner with us to bring fencing demonstrations and clinics to your school or community center.",
      cta: "Schedule Event",
    },
    {
      icon: Mail,
      title: "Spread the Word",
      description: "Follow us on social media and help us reach more families who could benefit from our programs.",
      cta: "Follow Us",
    },
  ]

  return (
    <section id="get-involved" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Get Involved</h2>
          <p className="text-xl text-gray-300 text-pretty leading-relaxed">
            There are many ways you can support our mission and help us reach more students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {ways.map((way, index) => {
            const Icon = way.icon
            return (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                    style={{ backgroundColor: "#FACC14" }}
                  >
                    <Icon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{way.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow text-sm">{way.description}</p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-white border-white/30 hover:bg-white hover:text-black"
                  >
                    {way.cta}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-lg overflow-hidden max-w-5xl mx-auto">
          <div className="absolute inset-0">
            <img
              src="/fencing-competition-action-shot.jpg"
              alt="Fencing action"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>
          <div className="relative p-12 md:p-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Make a Difference?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl text-pretty leading-relaxed">
              Every contribution, big or small, helps us break down barriers and build champions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                style={{ backgroundColor: "#FACC14", color: "#000" }}
                className="text-lg px-8 py-6 hover:opacity-90 font-semibold"
              >
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 text-white border-white hover:bg-white hover:text-black"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
