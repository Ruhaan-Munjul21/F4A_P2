import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MissionSection() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-white/5">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-xl text-white/70 leading-relaxed mb-8">
          We believe that fencing should be accessible to everyone, regardless of their background or financial
          situation. Through free programs, expert coaching, and community support, we're breaking down barriers and
          creating opportunities for youth to excel in this Olympic sport.
        </p>
        <Link href="/about">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 font-medium bg-transparent"
          >
            Learn More About Us
          </Button>
        </Link>
      </div>
    </section>
  )
}
