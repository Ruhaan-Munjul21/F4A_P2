import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Fencing for Everyone</h3>
            <p className="text-slate-300 mb-4 max-w-md">
              Making the sport of fencing accessible to all students, regardless of economic background. 
              Join our community and discover your passion for this elegant sport.
            </p>
            <div className="flex items-center space-x-2 text-slate-300">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm">Building champions, one student at a time</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-slate-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-slate-300 hover:text-white transition-colors">
                Programs
              </Link>
              <Link href="/marketplace" className="block text-slate-300 hover:text-white transition-colors">
                Equipment
              </Link>
              <Link href="/gallery" className="block text-slate-300 hover:text-white transition-colors">
                Gallery
              </Link>
              <Link href="/endowment" className="block text-slate-300 hover:text-white transition-colors">
                Endowment
              </Link>
            </div>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-md font-semibold mb-4">Get Involved</h4>
            <div className="space-y-2">
              <Link href="/register" className="block text-slate-300 hover:text-white transition-colors">
                Register for Classes
              </Link>
              <Link href="/gear-dropoff" className="block text-slate-300 hover:text-white transition-colors">
                Donate Equipment
              </Link>
              <Link href="/gear-pickup" className="block text-slate-300 hover:text-white transition-colors">
                Request Gear
              </Link>
              <Link href="/donate" className="block text-slate-300 hover:text-white transition-colors">
                Make a Donation
              </Link>
              <Link href="/contact" className="block text-slate-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@fencingforeveryone.org</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-FENCE</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Multiple locations serving our community</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>© {currentYear} Fencing for Everyone. All rights reserved. Building inclusive communities through sport.</p>
        </div>
      </div>
    </footer>
  );
}