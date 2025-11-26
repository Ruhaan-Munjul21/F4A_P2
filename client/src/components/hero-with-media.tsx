import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";

interface HeroWithMediaProps {
  title?: string;
  subtitle?: string;
}

export default function HeroWithMedia({
  title = "Making Fencing Accessible to Everyone",
  subtitle = "Free fencing classes, equipment donations, and community support for underprivileged students. Join our mission to break down barriers in sport."
}: HeroWithMediaProps) {
  const { data: mediaFiles = [] } = useMedia();
  
  // Only use images for hero background - no videos
  const heroImages = getImagesByCategory(mediaFiles, 'home-hero');
  
  // Debug logging
  console.log('HeroWithMedia - Media files:', mediaFiles.length);
  console.log('HeroWithMedia - Hero images:', heroImages.length, heroImages);
  
  // Only use hero images, never videos for the background
  const hasImage = heroImages.length > 0;
  
  // For Firebase URLs, we can't control quality params, but we can ensure proper rendering
  let imageUrl = hasImage ? getMediaUrl(heroImages[0].filePath) : 
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=90";
  
  // Log the actual image being used
  if (hasImage) {
    console.log('Hero image details:', {
      url: imageUrl,
      filename: heroImages[0].filename,
      fileSize: heroImages[0].fileSize,
      mimeType: heroImages[0].mimeType
    });
  }

  return (
    <section className="pt-32 pb-20 px-6 lg:px-12 relative">
      {/* Hero gradient background */}
      <div className="absolute inset-0 gradient-hero pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              Making Fencing
              <br />
              Accessible to{" "}
              <span className="italic gradient-text pr-4">Everyone</span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed max-w-xl">
              Empowering youth through the sport of fencing with free classes, expert coaching, and competitive
              opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donate">
                <Button className="gradient-primary text-primary-foreground hover:opacity-90 rounded-full px-8 h-14 text-lg font-medium shadow-lg glow-primary transition-all">
                  Support Our Mission
                </Button>
              </Link>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZ-oGxJJO5GgRmGTMy81JMIjLyrHYqyaarkfX4S9vyCyeZvg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-border backdrop-blur-sm text-foreground hover:bg-card hover:border-primary rounded-full px-8 h-14 text-lg font-medium bg-card/50 transition-all"
                >
                  Register for Free Classes
                </Button>
              </a>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
            <img
              src={hasImage ? getMediaUrl(heroImages[0].filePath) : imageUrl}
              alt="Young fencer in action"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}