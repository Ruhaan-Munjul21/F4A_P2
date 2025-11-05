import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Heart } from "lucide-react";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";

interface DynamicHeroProps {
  title?: string;
  subtitle?: string;
  fallbackImage?: string;
}

export default function DynamicHero({ 
  title = "Making Fencing Accessible to Everyone",
  subtitle = "Free fencing classes, equipment donations, and community support for underprivileged students. Join our mission to break down barriers in sport.",
  fallbackImage = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
}: DynamicHeroProps) {
  const { data: mediaFiles = [] } = useMedia();
  const heroImages = getImagesByCategory(mediaFiles, 'hero');
  
  // Sort by creation date (newest first) and use only the most recent hero image
  const sortedHeroImages = [...heroImages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Use the most recent uploaded hero image or fallback
  const backgroundImage = sortedHeroImages.length > 0 
    ? getMediaUrl(sortedHeroImages[0].filePath)
    : fallbackImage;

  return (
    <section className="relative hero-overlay text-primary-foreground">
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      >
        <div className="absolute inset-0 hero-overlay opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {title.includes("Everyone") ? (
                <>
                  Making Fencing Accessible to{" "}
                  <span className="text-yellow-300">Everyone</span>
                </>
              ) : (
                title
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 btn-hover-lift"
                asChild
              >
                <Link href="/register">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Register for Classes
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 btn-hover-lift"
                asChild
              >
                <Link href="/donate">
                  <Heart className="w-5 h-5 mr-2" />
                  Support Our Mission
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}