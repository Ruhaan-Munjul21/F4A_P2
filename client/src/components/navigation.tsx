import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Swords } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  // Hide navigation on admin and editor pages
  if (location.startsWith('/admin') || location.includes('/editor')) {
    return null;
  }

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Programs" },
    { href: "/scholarship-endowment", label: "Scholarships" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="backdrop-blur-dark rounded-xl shadow-lg px-6 py-4 border border-border">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Swords className="h-6 w-6 text-primary drop-shadow-md" />
                </div>
                <span className="text-2xl font-bold text-foreground drop-shadow-md">
                  Fencing <span className="text-primary">For Everyone</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/* Center Links */}
              <div className="flex items-center space-x-2 mr-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      location === item.href
                        ? "text-background bg-primary"
                        : "text-foreground drop-shadow-md hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 h-auto rounded-lg font-semibold text-sm shadow backdrop-blur-sm glow-primary"
                  asChild
                >
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZ-oGxJJO5GgRmGTMy81JMIjLyrHYqyaarkfX4S9vyCyeZvg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">Get Started</a>
                </Button>

                <Button
                  className="bg-card hover:bg-card/90 text-card-foreground border border-border px-4 py-2 h-auto rounded-lg font-semibold text-sm shadow backdrop-blur-sm"
                  asChild
                >
                  <Link href="/donate">Support Us</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-lg p-2">
                    <Menu className="h-5 w-5 text-foreground drop-shadow-md" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background border-border gradient-card">
                  <div className="flex flex-col space-y-2 mt-6">
                    {/* Mobile Logo */}
                    <div className="flex items-center space-x-2 mb-6 pb-3 border-b border-border">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Swords className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xl font-bold text-foreground">
                        Fencing <span className="text-primary">For Everyone</span>
                      </span>
                    </div>

                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          location === item.href
                            ? "text-background bg-primary"
                            : "text-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-border space-y-3">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold py-3 text-base shadow glow-primary"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZ-oGxJJO5GgRmGTMy81JMIjLyrHYqyaarkfX4S9vyCyeZvg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">Get Started</a>
                      </Button>

                      <Button
                        className="w-full bg-card hover:bg-card/90 text-card-foreground border border-border rounded-lg font-bold py-3 text-base shadow"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/donate">Donate</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}