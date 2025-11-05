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
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg px-6 py-4 border border-white/20">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Swords className="h-6 w-6 text-white drop-shadow-md" />
                </div>
                <span className="text-2xl font-bold text-white drop-shadow-md">
                  Fencing<span className="text-yellow-300">ForEveryone</span>
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
                        ? "text-gray-900 bg-white/80"
                        : "text-white drop-shadow-md hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  className="bg-yellow-400/90 hover:bg-yellow-400 text-gray-900 px-4 py-2 h-auto rounded-lg font-semibold text-sm shadow backdrop-blur-sm"
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>

                <Button
                  className="bg-white/80 hover:bg-white/90 text-gray-900 px-4 py-2 h-auto rounded-lg font-semibold text-sm shadow backdrop-blur-sm"
                  asChild
                >
                  <Link href="/donate">Support Us</Link>
                </Button>

                <Button
                  variant="ghost"
                  className="text-white drop-shadow-md hover:text-white hover:bg-white/10 px-3 py-2 h-auto rounded-lg font-medium text-sm"
                  asChild
                >
                  <Link href="/admin">Admin Portal</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-lg p-2">
                    <Menu className="h-5 w-5 text-white drop-shadow-md" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-gradient-to-b from-blue-600 to-emerald-600">
                  <div className="flex flex-col space-y-2 mt-6">
                    {/* Mobile Logo */}
                    <div className="flex items-center space-x-2 mb-6 pb-3 border-b border-white/20">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Swords className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-white">
                        Fencing<span className="text-yellow-300">ForEveryone</span>
                      </span>
                    </div>

                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          location === item.href
                            ? "text-blue-900 bg-white/90"
                            : "text-white/90 hover:text-white hover:bg-white/20"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="pt-4 mt-4 border-t border-white/20 space-y-3">
                      <Button
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 rounded-lg font-bold py-3 text-base shadow"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/register">Get Started</Link>
                      </Button>

                      <Button
                        className="w-full bg-white hover:bg-gray-100 text-blue-700 rounded-lg font-bold py-3 text-base shadow"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/donate">Donate</Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-white/50 text-white hover:bg-white/20 rounded-lg font-medium py-3 text-base"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/admin">Admin Portal</Link>
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