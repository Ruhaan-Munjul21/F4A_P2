export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This program gave my daughter confidence and discipline. She's now competing at the state level and thriving!",
      author: "Parent of Student",
      role: "2 years in program",
    },
    {
      quote:
        "I never thought I'd find something I was passionate about until I started fencing here. The coaches believe in us.",
      author: "Marcus, Age 15",
      role: "Youth Program Student",
    },
    {
      quote: "Fencing for Everyone doesn't just teach the sport—they build character, leadership, and community.",
      author: "School Principal",
      role: "Partner Organization",
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-12 bg-white/5">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">What People Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#252525] p-8 rounded-2xl border border-white/10">
              <p className="text-white/70 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-white/50 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
