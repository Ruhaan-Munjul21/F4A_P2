export function PartnersSection() {
  const partners = [
    "Local School District",
    "Community Center",
    "Sports Foundation",
    "Youth Development Fund",
    "City Recreation Dept",
    "Olympic Committee",
  ]

  return (
    <section className="py-20 px-6 lg:px-12 bg-white/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Partners</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center text-center hover:bg-white/10 transition-all"
            >
              <p className="text-white font-medium">{partner}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
