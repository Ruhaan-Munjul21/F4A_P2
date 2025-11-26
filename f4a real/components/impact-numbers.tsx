export function ImpactNumbers() {
  const stats = [
    { number: "500+", label: "Students Trained", color: "from-primary to-amber-400" },
    { number: "15", label: "Tournament Wins", color: "from-secondary to-purple-400" },
    { number: "100%", label: "Free Programs", color: "from-accent to-orange-400" },
    { number: "8", label: "Years Running", color: "from-blue-500 to-cyan-400" },
  ]

  return (
    <section className="py-20 px-6 lg:px-12 relative bg-surface-elevated/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto relative">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Our <span className="gradient-text">Impact</span> in Numbers
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`text-5xl font-bold mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.number}
              </div>
              <div className="text-foreground/70 group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
