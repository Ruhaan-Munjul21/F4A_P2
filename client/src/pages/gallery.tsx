import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";

export default function Gallery() {
  const galleryCategories = [
    {
      title: "Youth Programs",
      images: [
        {
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Students learning fencing basics in after-school program",
          caption: "After-school fencing fundamentals class"
        },
        {
          url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Young fencer practicing proper stance",
          caption: "Individual technique coaching"
        },
        {
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Group of students in fencing gear",
          caption: "Youth competition preparation"
        }
      ]
    },
    {
      title: "Equipment & Facilities",
      images: [
        {
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Professional fencing equipment display",
          caption: "Quality equipment for all students"
        },
        {
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Modern fencing facility with proper flooring",
          caption: "Our state-of-the-art training facility"
        },
        {
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Equipment storage and organization",
          caption: "Organized equipment storage system"
        }
      ]
    },
    {
      title: "Community Events",
      images: [
        {
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Community fencing demonstration",
          caption: "Annual community open house"
        },
        {
          url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Students celebrating tournament success",
          caption: "Celebrating student achievements"
        },
        {
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          alt: "Family and friends watching fencing demonstration",
          caption: "Family engagement event"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the vibrant community and transformative experiences at Fencing for Everyone through our photo collection.
            </p>
          </div>
        </div>

        {/* Gallery Sections */}
        {galleryCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              <Badge variant="outline" className="text-sm">
                {category.images.length} photos
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.map((image, imageIndex) => (
                <Card key={imageIndex} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-video">
                    <img 
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{image.caption}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* Video Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Videos</h2>
            <Badge variant="outline" className="text-sm">
              1 video
            </Badge>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white transition-colors cursor-pointer">
                      <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Fencing for Everyone: Our Mission
                    </h3>
                    <p className="text-muted-foreground">
                      A 3-minute documentary about our impact on the community
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Introduction to Our Programs</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn about our mission, meet our students, and see the impact of your support.
                    </p>
                  </div>
                  <Button>
                    Watch Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to be part of our story?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community and help create more moments like these. Every donation and volunteer hour makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Donate Now
            </Button>
            <Button size="lg" variant="outline">
              Volunteer With Us
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}