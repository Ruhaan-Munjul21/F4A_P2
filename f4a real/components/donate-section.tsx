import { Button } from "@/components/ui/button"
import { Heart, Users, Trophy, Book } from "lucide-react"

export function DonateSection() {
  const impactAreas = [
    {
      icon: Users,
      title: "Equipment & Gear",
      description: "$50 provides a full set of fencing equipment for one student",
    },
    {
      icon: Trophy,
      title: "Competition Support",
      description: "$200 covers tournament registration and travel for one student",
    },
    {
      icon: Book,
      title: "Coach Training",
      description: "$500 funds certification training for volunteer coaches",
    },
    {
      icon: Heart,
      title: "General Support",
      description: "Any amount helps us reach more students and expand our programs",
    },
  ]

  return (
    <section className="pt-32 pb-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Support Our Mission</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Your donation helps us provide free fencing programs to youth who wouldn't otherwise have access to this
            incredible sport
          </p>
        </div>

        <div className="bg-white/5 p-8 lg:p-12 rounded-2xl border border-white/10 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Where Your Donation Goes</h2>
            <p className="text-white/70">100% of donations go directly to program costs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {impactAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <div key={index} className="bg-[#252525] p-6 rounded-xl border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-[#FACC14] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
                  <p className="text-white/70 text-sm">{area.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <a href="https://gofundme.com" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="bg-[#FACC14] text-black hover:bg-[#FACC14]/90 rounded-full px-12 h-14 text-lg font-medium">
                Donate on GoFundMe
              </Button>
            </a>
            <p className="text-white/50 text-sm mt-4">You'll be redirected to our GoFundMe campaign</p>
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Other Ways to Support</h3>
          <div className="space-y-4 text-white/70">
            <p>
              <span className="text-[#FACC14] font-semibold">Volunteer:</span> Share your time and skills by coaching,
              mentoring, or helping with events
            </p>
            <p>
              <span className="text-[#FACC14] font-semibold">Equipment Donations:</span> We accept gently used fencing
              equipment in good condition
            </p>
            <p>
              <span className="text-[#FACC14] font-semibold">Corporate Sponsorship:</span> Partner with us to make a
              bigger impact in the community
            </p>
          </div>
          <p className="text-white/50 text-sm mt-6 text-center">
            Contact us at donate@fencingforeveryone.org for more information
          </p>
        </div>
      </div>
    </section>
  )
}
