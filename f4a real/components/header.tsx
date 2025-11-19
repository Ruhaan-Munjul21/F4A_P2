"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground">
              En Garde <span style={{ color: "#FACC14" }}>Foundation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-medium hover:text-[#FACC14] transition-colors">
              About
            </Link>
            <Link href="#programs" className="text-sm font-medium hover:text-[#FACC14] transition-colors">
              Programs
            </Link>
            <Link href="#impact" className="text-sm font-medium hover:text-[#FACC14] transition-colors">
              Impact
            </Link>
            <Link href="#get-involved" className="text-sm font-medium hover:text-[#FACC14] transition-colors">
              Get Involved
            </Link>
            <Button style={{ backgroundColor: "#FACC14", color: "#000" }} className="hover:opacity-90">
              Donate Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-[#FACC14] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#programs"
              className="text-sm font-medium hover:text-[#FACC14] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="#impact"
              className="text-sm font-medium hover:text-[#FACC14] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact
            </Link>
            <Link
              href="#get-involved"
              className="text-sm font-medium hover:text-[#FACC14] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Involved
            </Link>
            <Button style={{ backgroundColor: "#FACC14", color: "#000" }} className="hover:opacity-90 w-full">
              Donate Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
