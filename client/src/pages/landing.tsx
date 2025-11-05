import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroWithMedia from "@/components/hero-with-media";
import StatsSection from "@/components/stats-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, GraduationCap, Heart, Shirt, HandHeart, Building, Play } from "lucide-react";
import { Link } from "wouter";
import { useMedia, getVideosByCategory, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Landing() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const { data: mediaFiles = [], isLoading: mediaLoading } = useMedia();

  // Fetch mission section content
  const { data: missionContent } = useQuery({
    queryKey: ['page-content', 'home', 'mission'],
    queryFn: async () => {
      const response = await fetch('/api/page-content/home?sectionId=mission');
      if (!response.ok) throw new Error('Failed to fetch mission content');
      return response.json();
    },
  });
  const heroVideos = getVideosByCategory(mediaFiles, 'home-hero');
  const introVideos = getVideosByCategory(mediaFiles, 'intro-video');
  const testimonialVideos = getVideosByCategory(mediaFiles, 'testimonials');

  // Get images for video posters
  const heroImages = getImagesByCategory(mediaFiles, 'home-hero');
  const videoPosterImages = getImagesByCategory(mediaFiles, 'video-poster');

  // Combine hero and intro videos (intro-video is used by some uploads)
  const allHeroVideos = [...heroVideos, ...introVideos];

  // Get the best poster image (prefer video-poster category, then hero images)
  const posterImage = videoPosterImages.length > 0 ? videoPosterImages[0] :
                      heroImages.length > 0 ? heroImages[0] : null;
  const posterUrl = posterImage ? getMediaUrl(posterImage.filePath) :
                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080";

  // Get mission image from media files or content
  const missionImages = getImagesByCategory(mediaFiles, 'mission-image');

  // Get gallery images - category 'gallery' or 'homepage-gallery'
  const allGalleryImages = getImagesByCategory(mediaFiles, 'gallery').concat(
    getImagesByCategory(mediaFiles, 'homepage-gallery')
  );

  // Sort images by their position metadata or use them in order
  const getImageForPosition = (position: string) => {
    // First try to find an image specifically assigned to this position
    const assignedImage = allGalleryImages.find(img =>
      img.metadata && (img.metadata as any).position === position
    );
    if (assignedImage) return assignedImage;

    // Otherwise return images in order
    const positions = ['youth-program', 'quality-equipment', 'competition-ready', 'community-events', 'personal-coaching', 'celebrating-success'];
    const index = positions.indexOf(position);
    return allGalleryImages[index] || null;
  };

  // Helper functions to get mission content values
  const getMissionValue = (key: string, defaultValue: string) => {
    if (!missionContent || missionContent.length === 0) return defaultValue;

    const contentItem = missionContent.find((item: any) =>
      item.contentType === 'text' && item.metadata?.key === key
    );

    return contentItem?.content || defaultValue;
  };

  const getMissionImageUrl = () => {
    // First try to get from mission-image category in media files
    if (missionImages.length > 0) {
      return getMediaUrl(missionImages[0].filePath);
    }

    // Then try from page content
    if (missionContent && missionContent.length > 0) {
      const imageContent = missionContent.find((item: any) =>
        item.contentType === 'image' || item.imageUrl
      );
      if (imageContent?.imageUrl) {
        return imageContent.imageUrl;
      }
    }

    // Default fallback image
    return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  };

  // Debug logging
  console.log('Media files loaded:', mediaFiles.length);
  console.log('Hero videos found:', heroVideos.length, heroVideos);
  console.log('Intro videos found:', introVideos.length, introVideos);
  console.log('Combined videos for display:', allHeroVideos.length, allHeroVideos);
  console.log('Poster image:', posterImage);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroWithMedia />
      
      <StatsSection />

      {/* Intro Video Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See Our Impact in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how we're transforming lives through fencing, one student at a time.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-muted group">
              {!mediaLoading && allHeroVideos.length > 0 ? (
                <>
                  <video
                    key={allHeroVideos[0].id}
                    src={getMediaUrl(allHeroVideos[0].filePath)}
                    poster={posterUrl}
                    controls
                    muted={false}
                    controlsList="nodownload"
                    preload="metadata"
                    className="w-full h-full object-cover"
                    onPlay={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                    onEnded={() => setVideoPlaying(false)}
                    onError={(e) => {
                      console.error('Video failed to load:', allHeroVideos[0].filePath);
                      console.error('Error event:', e);
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  {/* Play button overlay - only show when video is not playing */}
                  {!videoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 rounded-full p-6 shadow-2xl transform transition-transform group-hover:scale-110">
                        <Play className="w-12 h-12 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </>
              ) : mediaLoading ? (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Loading video...
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white transition-colors cursor-pointer">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Our Story: Making Fencing Accessible
                    </h3>
                    <p className="text-muted-foreground">
                      Upload a video with category "hero" or "intro-video" in the admin panel to feature here.
                      <br />
                      <span className="text-xs opacity-75">Tip: Upload an image with category "video-poster" for a custom cover image</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About/Mission Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {getMissionValue('title', 'Our Mission:')} <span className="text-primary">{getMissionValue('subtitle', 'Breaking Barriers in Sport')}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {getMissionValue('description1', 'Founded in 2022, Fencing for Everyone emerged from a simple belief: every student deserves the opportunity to discover their potential through sport, regardless of their economic background.')}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {getMissionValue('description2', 'Through our comprehensive programs, we provide free fencing instruction, equipment loans, and a supportive community that helps students build confidence, discipline, and lifelong friendships.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={getMissionValue('buttonLink1', '/about')}>
                  <Button size="lg">
                    {getMissionValue('buttonText1', 'Learn More About Us')}
                  </Button>
                </Link>
                <Link href={getMissionValue('buttonLink2', '/contact')}>
                  <Button variant="outline" size="lg">
                    {getMissionValue('buttonText2', 'Get In Touch')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={getMissionImageUrl()}
                alt="Students learning fencing fundamentals"
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">{getMissionValue('badgeText', '100%')}</div>
                <div className="text-sm">{getMissionValue('badgeSubtext', 'Classes are FREE')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Free</span> Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive fencing programs designed for all skill levels and age groups, completely free of charge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Youth Classes (Ages 8-17)</h3>
                <p className="text-muted-foreground mb-4">
                  Age-appropriate instruction focusing on fundamentals, safety, and fun while building confidence and discipline.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                  <li>• Beginner to Advanced levels</li>
                  <li>• All equipment provided</li>
                  <li>• Certified instructors</li>
                  <li>• Weekend and after-school options</li>
                </ul>
                <Button className="w-full">
                  Register Now - FREE
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Summer Camps</h3>
                <p className="text-muted-foreground mb-4">
                  Intensive week-long camps combining fencing instruction with character building and social activities.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                  <li>• Full-day programs</li>
                  <li>• Meals included</li>
                  <li>• Skills competitions</li>
                  <li>• Take-home starter kit</li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Apply for Camp - FREE
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Competition Training</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced training for students interested in competitive fencing, with tournament opportunities.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                  <li>• Regional competitions</li>
                  <li>• Advanced technique training</li>
                  <li>• Mental preparation</li>
                  <li>• Scholarship opportunities</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Join Team - FREE
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Community in <span className="text-primary">Action</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Witness the transformative power of fencing through the eyes of our students, instructors, and community partners.
            </p>
          </div>

          {/* Gallery Grid - Now with uploadable images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main feature image - Youth Fencing Program */}
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="relative h-80 lg:h-full rounded-xl overflow-hidden shadow-lg group">
                {(() => {
                  const image = getImageForPosition('youth-program');
                  return image ? (
                    <img
                      src={getMediaUrl(image.filePath)}
                      alt={image.altText || "Youth Fencing Program"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                      alt="Students in fencing class learning proper stance and technique"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-2">Youth Fencing Program</h3>
                  <p className="text-sm opacity-90">Students ages 8-17 learning fundamentals in our after-school program</p>
                </div>
              </div>
            </div>

            {/* Equipment showcase */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              {(() => {
                const image = getImageForPosition('quality-equipment');
                return image ? (
                  <img
                    src={getMediaUrl(image.filePath)}
                    alt={image.altText || "Quality Equipment"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Professional fencing equipment"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              );
              })()}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Quality Equipment</h3>
                <p className="text-sm opacity-90">Professional-grade gear for all students</p>
              </div>
            </div>

            {/* Competition preparation */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              {(() => {
                const image = getImageForPosition('competition-ready');
                return image ? (
                  <img
                    src={getMediaUrl(image.filePath)}
                    alt={image.altText || "Competition Ready"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Young fencer ready for tournament"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              );
              })()}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Competition Ready</h3>
                <p className="text-sm opacity-90">Advanced training for tournaments</p>
              </div>
            </div>

            {/* Community event */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              {(() => {
                const image = getImageForPosition('community-events');
                return image ? (
                  <img
                    src={getMediaUrl(image.filePath)}
                    alt={image.altText || "Community Events"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Community fencing event"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              );
              })()}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Community Events</h3>
                <p className="text-sm opacity-90">Bringing families together through sport</p>
              </div>
            </div>

            {/* Mentorship moment */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              {(() => {
                const image = getImageForPosition('personal-coaching');
                return image ? (
                  <img
                    src={getMediaUrl(image.filePath)}
                    alt={image.altText || "Personal Coaching"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="One-on-one coaching"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              );
              })()}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Personal Coaching</h3>
                <p className="text-sm opacity-90">Individual attention for every student</p>
              </div>
            </div>

            {/* Achievement celebration */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              {(() => {
                const image = getImageForPosition('celebrating-success');
                return image ? (
                  <img
                    src={getMediaUrl(image.filePath)}
                    alt={image.altText || "Celebrating Success"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                <img
                  src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Students celebrating achievement"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              );
              })()}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Celebrating Success</h3>
                <p className="text-sm opacity-90">Recognizing student achievements</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/gallery">View Full Photo Gallery</Link>
            </Button>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
