import { Link } from "wouter";
import { Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Fencing <span className="text-primary">For Everyone</span></h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Making the sport of fencing accessible to all students, regardless of economic background.
              Join our community and discover your passion for this elegant sport.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm">Building champions, one student at a time</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Programs
              </Link>
              <Link href="/marketplace" className="block text-muted-foreground hover:text-primary transition-colors">
                Equipment
              </Link>
              <Link href="/gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/endowment" className="block text-muted-foreground hover:text-primary transition-colors">
                Endowment
              </Link>
            </div>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-foreground">Get Involved</h4>
            <div className="space-y-2">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZ-oGxJJO5GgRmGTMy81JMIjLyrHYqyaarkfX4S9vyCyeZvg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Register for Classes
              </a>
              <Link href="/gear-dropoff" className="block text-muted-foreground hover:text-primary transition-colors">
                Donate Equipment
              </Link>
              <Link href="/gear-pickup" className="block text-muted-foreground hover:text-primary transition-colors">
                Request Gear
              </Link>
              <Link href="/donate" className="block text-muted-foreground hover:text-primary transition-colors">
                Make a Donation
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@fencingforeveryone.org</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Multiple locations serving our community</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Fencing for Everyone. All rights reserved. Building inclusive communities through sport.</p>
          <Link href="/admin" className="inline-block mt-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}