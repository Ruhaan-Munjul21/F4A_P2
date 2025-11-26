export function StatsSection() {
  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "12", label: "Partner Schools" },
    { value: "95%", label: "Student Satisfaction" },
    { value: "$250K", label: "Equipment Donated" },
  ]

  return (
    <section className="py-32 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl lg:text-6xl font-medium text-[#FACC14] mb-3">{stat.value}</div>
              <div className="text-sm lg:text-base text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
