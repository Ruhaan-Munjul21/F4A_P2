import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative hero-overlay text-primary-foreground">
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
        }}
      >
        <div className="absolute inset-0 hero-overlay opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Making Fencing Accessible to{" "}
              <span className="text-yellow-300">Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Free fencing classes, equipment donations, and community support for
              underprivileged students. Join our mission to break down barriers in
              sport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 btn-hover-lift"
                asChild
              >
                <Link href="/services">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Register for FREE Classes
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 btn-hover-lift"
                asChild
              >
                <Link href="/marketplace">
                  <Heart className="h-5 w-5 mr-2" />
                  Donate Equipment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
