import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HomeHero() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-12 relative">
      {/* Hero gradient background */}
      <div className="absolute inset-0 gradient-hero pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              Making Fencing
              <br />
              Accessible to{" "}
              <span className="italic gradient-text">Everyone</span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed max-w-xl">
              Empowering youth through the sport of fencing with free classes, expert coaching, and competitive
              opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donate">
                <Button className="gradient-primary text-primary-foreground hover:opacity-90 rounded-full px-8 h-14 text-lg font-medium shadow-lg glow-primary transition-all">
                  Support Our Mission
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="border-border backdrop-blur-sm text-foreground hover:bg-card hover:border-primary rounded-full px-8 h-14 text-lg font-medium bg-card/50 transition-all"
                >
                  Register for Free Classes
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
            <Image
              src="/young-fencer-in-action-with-foil-dynamic-pose.jpg"
              alt="Young fencer in action"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
