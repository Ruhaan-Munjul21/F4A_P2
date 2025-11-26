import { Button } from "@/components/ui/button"
import Image from "next/image"

export function MinimalHero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center pt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight mb-8">
              Fencing For Everyone
            </h1>

            <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-12 max-w-lg">
              Making the sport of fencing accessible to all communities since 2020
            </p>

            <Button
              size="lg"
              className="bg-[#FACC14] text-black hover:bg-[#FACC14]/90 rounded-full px-8 h-14 text-base font-medium"
            >
              Start Your Journey
            </Button>
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <Image src="/fencer-in-action-with-foil--dynamic-pose--professi.jpg" alt="Fencer in action" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  )
}
