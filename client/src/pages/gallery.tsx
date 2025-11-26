import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import MediaGallery from "@/components/media-gallery";
import DynamicHero from "@/components/dynamic-hero";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <DynamicHero
        title="Photo & Video Gallery"
        subtitle="Explore the vibrant community and transformative experiences at Fencing for Everyone through our media collection."
        variant="dark"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Media <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our collection of photos and videos showcasing the impact of our programs, 
              student achievements, community events, and facility updates.
            </p>
          </div>
        </div>

        {/* Dynamic Media Gallery */}
        <MediaGallery showFilters={true} columns={3} />

        {/* Call to Action */}
        <section className="mt-16 text-center bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to be part of our story?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community and help create more moments like these. Every donation and volunteer hour makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Volunteer With Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}