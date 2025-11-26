import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-xl font-medium tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <span className="gradient-text">Fencing</span> for Everyone
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/programs" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                Programs
              </Link>
              <Link href="/gallery" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                Gallery
              </Link>
            </nav>
            <Link href="/donate">
              <Button className="gradient-primary text-primary-foreground hover:opacity-90 rounded-full px-6 h-11 font-medium shadow-lg transition-all">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
