import { Target, Heart, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Mission</h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            We believe that every child deserves access to the transformative power of fencing, regardless of their
            background or financial situation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Value 1 */}
          <div className="text-center p-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: "#FACC14" }}
            >
              <Target className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Accessibility</h3>
            <p className="text-muted-foreground leading-relaxed">
              We provide free and low-cost fencing programs to underserved communities, ensuring that financial barriers
              never prevent a child from participating.
            </p>
          </div>

          {/* Value 2 */}
          <div className="text-center p-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: "#FACC14" }}
            >
              <Heart className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Community</h3>
            <p className="text-muted-foreground leading-relaxed">
              We foster a supportive environment where students build confidence, discipline, and lifelong friendships
              through the sport of fencing.
            </p>
          </div>

          {/* Value 3 */}
          <div className="text-center p-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: "#FACC14" }}
            >
              <Users className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Excellence</h3>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to providing world-class coaching and equipment, helping students reach their full
              potential both on and off the strip.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <img
              src="/diverse-group-of-young-fencers-training-together.jpg"
              alt="Young fencers training"
              className="rounded-lg shadow-xl w-full object-cover aspect-video"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Building Champions Since 2016</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Founded by Olympic fencer Maria Chen, Fencing for Everyone began with a simple vision: make the elite
              sport of fencing accessible to all children.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              What started as a single after-school program has grown into a nationwide movement, touching the lives of
              hundreds of young athletes across 12 cities.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, our alumni have gone on to compete at national levels, earn college scholarships, and most
              importantly, become confident leaders in their communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
