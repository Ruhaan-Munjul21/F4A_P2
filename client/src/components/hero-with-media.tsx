import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Heart } from "lucide-react";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";

interface HeroWithMediaProps {
  title?: string;
  subtitle?: string;
}

export default function HeroWithMedia({ 
  title = "Making Fencing Accessible to Everyone",
  subtitle = "Free fencing classes, equipment donations, and community support for underprivileged students. Join our mission to break down barriers in sport."
}: HeroWithMediaProps) {
  const { data: mediaFiles = [], isLoading } = useMedia();
  
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
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden mt-0">
      {/* Background Image Only - No Videos */}
      <div className="absolute inset-0">
        {/* Background div with image */}
        <img
          src={imageUrl}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Making Fencing Accessible to{" "}
              <span className="text-yellow-400">Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
              {subtitle}
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg px-8"
                asChild
              >
                <Link href="/register">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Register for Free Classes
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8"
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

      {/* Admin Upload Hint */}
      {!isLoading && (
        <>
          {!hasImage && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-2 rounded backdrop-blur-sm">
              Upload hero images in Admin Panel
            </div>
          )}
          {hasImage && heroImages[0].fileSize < 500000 && (
            <div className="absolute bottom-4 right-4 bg-yellow-600/90 text-white text-xs px-3 py-2 rounded backdrop-blur-sm">
              ⚠️ Low resolution image detected ({Math.round(heroImages[0].fileSize / 1024)}KB)
              <br />Upload a higher resolution image (2MB+) for better quality
            </div>
          )}
        </>
      )}
    </section>
  );
}