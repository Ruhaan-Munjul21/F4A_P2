import Image from "next/image"

export function WhyWeStarted() {
  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image src="/youth-fencing-diverse-students.jpg" alt="Why we started" fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Why We Started</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Fencing has traditionally been seen as an exclusive sport, accessible only to those with significant
                financial resources. We started Fencing for Everyone to break down these barriers and prove that with
                the right support, any young person can excel.
              </p>
              <p>
                Our founder, Coach Sarah Martinez, grew up in an underserved community and was introduced to fencing
                through a school program. That opportunity changed her life, leading to a scholarship, Olympic training,
                and a passion for giving back.
              </p>
              <p>
                Today, we're committed to providing the same life-changing opportunities to the next generation,
                completely free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
