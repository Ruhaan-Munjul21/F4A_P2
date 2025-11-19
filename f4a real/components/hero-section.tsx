import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/fencer-in-action-dynamic-motion-blur.jpg" alt="Fencing action" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          Making Fencing Accessible to <span style={{ color: "#FACC14" }}>Everyone</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
          Breaking down barriers and building champions. Our nonprofit brings the sport of fencing to communities that
          need it most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            style={{ backgroundColor: "#FACC14", color: "#000" }}
            className="text-lg px-8 py-6 hover:opacity-90 font-semibold"
          >
            Join Our Programs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 text-white border-white hover:bg-white hover:text-black"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              500+
            </div>
            <div className="text-sm md:text-base text-gray-300">Students Served</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              12
            </div>
            <div className="text-sm md:text-base text-gray-300">Community Locations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              95%
            </div>
            <div className="text-sm md:text-base text-gray-300">Scholarship Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#FACC14" }}>
              8
            </div>
            <div className="text-sm md:text-base text-gray-300">Years Impact</div>
          </div>
        </div>
      </div>
    </section>
  )
}
