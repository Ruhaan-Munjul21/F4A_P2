export function ImpactAction() {
  return (
    <section className="py-20 px-6 lg:px-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5" />
      <div className="container mx-auto relative">
        <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
          Our Impact in <span className="gradient-text">Action</span>
        </h2>
        <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
          Watch how we're transforming lives through fencing and building a stronger community
        </p>
        <div className="max-w-4xl mx-auto aspect-video relative rounded-3xl overflow-hidden gradient-card hover-lift">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto shadow-xl glow-primary">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-foreground/70 font-medium">Video Coming Soon</p>
            </div>
          </div>
          <div className="absolute inset-0 border border-border/30 rounded-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
