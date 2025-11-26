import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, Users, Heart, Quote, Award, Mail, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";

export default function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false); // Disabled auto-rotation
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const { data: mediaFiles = [] } = useMedia();

  // Fetch team members from API (coaches)
  const { data: teamMembers = [], isLoading: loadingCoaches } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const response = await fetch('/api/team-members');
      if (!response.ok) throw new Error('Failed to fetch team members');
      return response.json();
    },
  });

  // Fetch page content for goals and partners
  const { data: pageContent = [] } = useQuery({
    queryKey: ['page-content', 'about'],
    queryFn: async () => {
      const response = await fetch('/api/page-content/about');
      if (!response.ok) return [];
      return response.json();
    },
  });

  // Fetch Why We Started content
  const { data: whyWeStartedContent = [] } = useQuery({
    queryKey: ['page-content', 'about', 'why-we-started'],
    queryFn: async () => {
      const response = await fetch('/api/page-content/about?sectionId=why-we-started');
      if (!response.ok) return [];
      return response.json();
    },
  });

  // Filter coaches specifically and sort by ordering (lower numbers first)
  const coaches = teamMembers
    .filter((m: any) => m.category === 'coaches' || m.category === 'leadership')
    .sort((a: any, b: any) => {
      // Always put Ruhaan Munjuluri first
      if (a.name && a.name.toLowerCase().includes('ruhaan')) return -1;
      if (b.name && b.name.toLowerCase().includes('ruhaan')) return 1;

      // Then sort by ordering
      const orderA = a.ordering !== null && a.ordering !== undefined ? a.ordering : 999;
      const orderB = b.ordering !== null && b.ordering !== undefined ? b.ordering : 999;
      return orderA - orderB;
    });

  // Debug: Log the first 3 coaches to see the order
  useEffect(() => {
    if (teamMembers.length > 0) {
      console.log('Raw team members from API:', teamMembers.filter((m: any) => m.category === 'coaches' || m.category === 'leadership').map((m: any) => ({
        name: m.name,
        ordering: m.ordering,
        category: m.category
      })));
    }
    if (coaches.length > 0) {
      console.log('Coaches after sorting:', coaches.slice(0, 3).map((c: any) => ({
        name: c.name,
        ordering: c.ordering
      })));
      console.log('First coach should be:', coaches[0]?.name);
    }
  }, [coaches, teamMembers]);

  const partners = teamMembers.filter((m: any) => m.category === 'partners');

  // Auto-rotate coaches carousel (move by 3 at a time)
  useEffect(() => {
    if (!isAutoRotating || coaches.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentCoachIndex((prev) => {
        const nextIndex = prev + 3;
        if (nextIndex >= coaches.length) return 0;
        return nextIndex;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoRotating, coaches.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    console.log('Testimonials count:', testimonials.length);
    console.log('Current active testimonial:', activeTestimonial);

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => {
        const next = (prev + 1) % testimonials.length;
        console.log('Switching from testimonial', prev, 'to', next);
        return next;
      });
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation (move by 3 cards)
  const goToNextCoach = () => {
    setIsAutoRotating(false);
    setCurrentCoachIndex((prev) => {
      const nextIndex = prev + 3;
      if (nextIndex >= coaches.length) return 0;
      return nextIndex;
    });
  };

  const goToPreviousCoach = () => {
    setIsAutoRotating(false);
    setCurrentCoachIndex((prev) => {
      const prevIndex = prev - 3;
      if (prevIndex < 0) {
        // Go to the last complete set of 3
        return Math.max(0, Math.floor((coaches.length - 1) / 3) * 3);
      }
      return prevIndex;
    });
  };

  // Get hero image
  const heroImages = getImagesByCategory(mediaFiles, 'about-hero');
  const heroImageUrl = heroImages.length > 0
    ? getMediaUrl(heroImages[0].filePath)
    : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600";


  // Get Why We Started image
  const whyWeStartedImages = getImagesByCategory(mediaFiles, 'why-we-started');
  const whyWeStartedImageUrl = whyWeStartedImages.length > 0
    ? getMediaUrl(whyWeStartedImages[0].filePath)
    : null;

  // Real testimonials
  const testimonials = [
    {
      name: "Parent",
      role: "Parent of Student",
      quote: "IT WAS ABSOLUTELY FANTASTIC! MY CHILD'S EXPERIENCE HAS BEEN REMARKABLE, AND HE THOROUGHLY ENJOYS EVERY MOMENT HE SPENDS IN THESE CLASSES. THIS PROGRAM HAS PROVIDED HIM WITH THE INCREDIBLE OPPORTUNITY TO DELVE INTO THIS BEAUTIFUL AND HIGHLY COMPETITIVE SPORT, AND HE HAS FALLEN IN LOVE WITH IT. I'M IMMENSELY GRATEFUL FOR THE SCHOLARSHIP THAT HE HAS OBTAINED, AND I FIRMLY BELIEVE HE WILL MAKE THE MOST OF THIS OPPORTUNITY AND TRULY SHINE.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Parent",
      role: "Parent of Student",
      quote: "I AM VERY GLAD THAT WE ENROLLED IN THIS PROGRAM. IT IS UNBELIEVABLE HOW COACH RUHAAN IS JUST DOING THESE CLASSES FOR FREE FOR SO LONG. WE REALLY APPRECIATE HIS TIME AND EFFORTS. MY FAVORITE PART OF THE PROGRAM IS THAT MY SON NEVER EVER SAID HE DIDN'T WANT TO GO THAT DAY AND ALSO THAT KIDS COULD USE THE EQUIPMENT OF THE F4A LIKE JACKETS AND HELMETS.",
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Student",
      role: "Program Participant",
      quote: "It was a fun experience, I learned a lot about fencing and I'm happy for the scholarship I was given. I wouldn't change anything about the program. My favorite part about the program was when we did the team event bouts.",
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "Student",
      role: "Youth Fencer",
      quote: "MY FAVORITE PART IS WHEN WE LEARN ABOUT PARRIES. AND I LIKE THE COACH. AND I LIKE THAT WE PLAY GAMES TO WARM UP. THERE IS NOTHING I WANT TO CHANGE.",
      image: "https://i.pravatar.cc/150?img=4"
    },
    {
      name: "Parent",
      role: "Parent of Student",
      quote: "My favorite part is how kind and patient coach Ruhaan is with the kids. I like the whole program and my son really really likes it!!",
      image: "https://i.pravatar.cc/150?img=5"
    }
  ];

  // Extract goals data from page content or use defaults
  const getGoalContent = (key: string, defaultValue: any) => {
    const content = pageContent.find((item: any) =>
      item.sectionId === 'goals' && item.metadata?.key === key
    );
    return content?.content || defaultValue;
  };

  // Extract Why We Started content or use defaults
  const getWhyWeStartedContent = (key: string, defaultValue: string) => {
    const content = whyWeStartedContent.find((item: any) =>
      item.contentType === 'text' && item.metadata?.key === key
    );
    return content?.content || defaultValue;
  };

  // Default goals if no content from CMS
  const goalsData = {
    studentsServed: getGoalContent('studentsServed', '50+'),
    scholarships: getGoalContent('scholarships', '2'),
    fundsRaised: getGoalContent('fundsRaised', '$2,000'),
    equipmentValue: getGoalContent('equipmentValue', '715'),
    goal1Title: getGoalContent('goal1Title', 'Expand to 3 New Locations'),
    goal1Desc: getGoalContent('goal1Desc', 'Partner with schools in underserved neighborhoods'),
    goal2Title: getGoalContent('goal2Title', 'Launch Equipment Library'),
    goal2Desc: getGoalContent('goal2Desc', '1,000 sets of gear available for loan'),
    goal3Title: getGoalContent('goal3Title', 'Competition Fund'),
    goal3Desc: getGoalContent('goal3Desc', 'Cover entry fees for 50 students in regional tournaments')
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Reduced height */}
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            About Fencing for Everyone
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Breaking down barriers in youth fencing since 2022
          </p>
        </div>
      </section>

      {/* Meet the Coaches - EDITABLE SECTION */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Meet Our Coaches</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Certified professionals who volunteer their expertise to develop the next generation
            </p>
          </div>

          {coaches.length > 0 ? (
            <div className="relative max-w-7xl mx-auto">
              {/* Carousel Container */}
              <div className="relative overflow-hidden px-12">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${(currentCoachIndex / 3) * 100}%)` }}
                >
                  {coaches.map((coach: any) => (
                    <div key={coach.id} className="w-1/3 flex-shrink-0 px-3">
                      <Card
                        className="overflow-hidden h-full cursor-pointer transition-all hover:shadow-xl hover:scale-105"
                        onClick={() => setSelectedCoach(coach)}
                      >
                        <div className="aspect-square relative bg-muted">
                          {coach.imageUrl ? (
                            <img
                              src={coach.imageUrl}
                              alt={coach.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="h-16 w-16 text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                            <h3 className="text-white font-bold text-lg">{coach.name}</h3>
                            <p className="text-white/90 text-sm">{coach.title}</p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm font-semibold text-muted-foreground line-clamp-3">
                            {coach.description || "Dedicated coach committed to youth development through fencing."}
                          </p>
                          {coach.description && coach.description.length > 150 && (
                            <p className="text-xs text-primary mt-2 font-medium">Click to read more →</p>
                          )}
                          {coach.metadata && (coach.metadata.certifications || coach.metadata.experience) && (
                            <div className="flex gap-2 flex-wrap mt-3">
                              {coach.metadata.certifications && (
                                <span className="px-2 py-1 bg-primary/10 rounded text-xs">
                                  {coach.metadata.certifications}
                                </span>
                              )}
                              {coach.metadata.experience && (
                                <span className="px-2 py-1 bg-primary/10 rounded text-xs">
                                  {coach.metadata.experience}
                                </span>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {coaches.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousCoach}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-black shadow-lg rounded-full p-3 transition-all hover:scale-110"
                    aria-label="Previous coach"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNextCoach}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-black shadow-lg rounded-full p-3 transition-all hover:scale-110"
                    aria-label="Next coach"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator - one dot per set of 3 */}
              {coaches.length > 3 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(coaches.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentCoachIndex(index * 3);
                        setIsAutoRotating(false);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        Math.floor(currentCoachIndex / 3) === index
                          ? 'w-8 bg-primary'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to coaches set ${index + 1}`}
                    />
                  ))}
                </div>
              )}

            </div>
          ) : !loadingCoaches ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No coaches added yet.</p>
              <p className="text-sm text-muted-foreground">
                Coaches can be added through the Admin Panel → Team Members section with category "coaches"
              </p>
            </div>
          ) : (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-muted-foreground">Loading coaches...</div>
            </div>
          )}
        </div>
      </section>

      {/* Goals & Impact - CLEAN DESIGN */}
      <section className="py-16 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Impact Stats - Clean centered design like reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Students Served */}
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2 group-hover:drop-shadow-[0_0_10px_rgba(250,204,20,0.3)]">{goalsData.studentsServed}</div>
              <p className="text-base font-medium text-foreground">Students</p>
              <p className="text-base text-muted-foreground">Served</p>
            </div>

            {/* Students on Scholarship */}
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Heart className="h-10 w-10 text-accent" />
                </div>
              </div>
              <div className="text-5xl font-bold text-accent mb-2 group-hover:drop-shadow-[0_0_10px_rgba(250,204,20,0.3)]">{goalsData.scholarships}</div>
              <p className="text-base font-medium text-foreground">Students on</p>
              <p className="text-base text-muted-foreground">Scholarship</p>
            </div>

            {/* Funds Raised */}
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Award className="h-10 w-10 text-secondary" />
                </div>
              </div>
              <div className="text-5xl font-bold text-secondary mb-2 group-hover:drop-shadow-[0_0_10px_rgba(250,204,20,0.3)]">{goalsData.fundsRaised}</div>
              <p className="text-base font-medium text-foreground">Funds</p>
              <p className="text-base text-muted-foreground">Raised</p>
            </div>

            {/* Equipment Value */}
            <div className="text-center group hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2 group-hover:drop-shadow-[0_0_10px_rgba(250,204,20,0.3)]">{goalsData.equipmentValue}</div>
              <p className="text-base font-medium text-foreground">Subscribers</p>
              <p className="text-base text-muted-foreground"></p>
            </div>
          </div>
        </div>
      </section>


      {/* Club Partners - EDITABLE WITH IMAGES */}
      <section className="py-12 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Our Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Organizations that help make our mission possible
            </p>
          </div>

          {partners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {partners.map((partner: any) => (
                <Card key={partner.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    {partner.imageUrl ? (
                      <div className="h-20 w-20 mx-auto mb-3 overflow-hidden rounded">
                        <img
                          src={partner.imageUrl}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-3xl mb-2">🤝</div>
                    )}
                    <h3 className="font-semibold text-sm mb-1">{partner.name}</h3>
                    <p className="text-xs text-primary mb-2">{partner.title || 'Partner'}</p>
                    <p className="text-xs text-muted-foreground">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Default partners if none in database */}
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">🤺</div>
                  <h3 className="font-semibold text-sm mb-1">USA Fencing</h3>
                  <p className="text-xs text-primary mb-2">National Governing Body</p>
                  <p className="text-xs text-muted-foreground">Official recognition and support</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">🏢</div>
                  <h3 className="font-semibold text-sm mb-1">Local YMCA</h3>
                  <p className="text-xs text-primary mb-2">Facility Partner</p>
                  <p className="text-xs text-muted-foreground">Training space and outreach</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-sm mb-1">SportsCare Foundation</h3>
                  <p className="text-xs text-primary mb-2">Equipment Sponsor</p>
                  <p className="text-xs text-muted-foreground">Professional gear donations</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">🤝</div>
                  <h3 className="font-semibold text-sm mb-1">Youth Sports Alliance</h3>
                  <p className="text-xs text-primary mb-2">Program Partner</p>
                  <p className="text-xs text-muted-foreground">Funding for athletes</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-3">
              {partners.length === 0 && "Partners can be added through Admin Panel → Team Members with category 'partners'"}
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why We Started - FOURTH */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-5">
                Why We Started
              </h2>
              <p className="text-base text-muted-foreground mb-4">
                {getWhyWeStartedContent('paragraph1', 'Fencing has traditionally been an exclusive sport - expensive equipment, costly lessons, and limited access. We saw talented kids being turned away simply because they couldn\'t afford $500 for basic gear or $150/month for coaching.')}
              </p>
              <p className="text-base text-muted-foreground mb-4">
                {getWhyWeStartedContent('paragraph2', 'In 2022, we started with one simple goal: make fencing accessible to every child who wants to learn, regardless of their family\'s financial situation.')}
              </p>
              <p className="text-base text-muted-foreground mb-5">
                {getWhyWeStartedContent('paragraph3', 'Today, we provide free equipment loans, no-cost coaching, and competition opportunities to over 200 students annually. Every piece of equipment is donated or purchased through community fundraising. Every coach volunteers their time. Every child gets the same high-quality training.')}
              </p>

              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                <Heart className="h-7 w-7 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">100% Free Programs</p>
                  <p className="text-xs text-muted-foreground">No child pays to participate</p>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-3">
              {whyWeStartedImageUrl ? (
                <img
                  src={whyWeStartedImageUrl}
                  alt="Why we started Fencing for Everyone"
                  className="w-full h-auto object-contain rounded-lg shadow-xl"
                />
              ) : (
                <div className="w-full min-h-[600px] bg-gray-200 rounded-lg shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No image uploaded yet</p>
                    <p className="text-sm text-gray-400">
                      Upload an image with category<br />
                      "why-we-started" in the admin panel
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials - WITH REAL CONTENT */}
      <section className="py-12 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">What People Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from our students and parents
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-6 min-h-[200px]">
              <div className="text-xs text-muted-foreground mb-2">
                Testimonial {activeTestimonial + 1} of {testimonials.length}
              </div>
              <Quote className="h-10 w-10 text-primary/20 mb-3" />
              <blockquote className="text-base text-muted-foreground mb-5">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-2 mt-5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Ready to Start Your Fencing Journey?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join our community and discover the sport that teaches discipline, respect, and strategic thinking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZ-oGxJJO5GgRmGTMy81JMIjLyrHYqyaarkfX4S9vyCyeZvg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                Register for Free Classes
              </Button>
            </a>
            <Link href="/gear-pickup">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                Request Equipment
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No experience needed • All equipment provided • Ages 8-17 welcome
          </p>
        </div>
      </section>

      {/* Team Member Detail Modal */}
      <Dialog open={!!selectedCoach} onOpenChange={(open) => !open && setSelectedCoach(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCoach && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCoach.name}</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="md:w-1/3">
                    <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                      {selectedCoach.imageUrl ? (
                        <img
                          src={selectedCoach.imageUrl}
                          alt={selectedCoach.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="h-20 w-20 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:w-2/3 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">{selectedCoach.title}</h3>
                      {(selectedCoach.metadata?.certifications || selectedCoach.metadata?.experience) && (
                        <div className="flex gap-2 flex-wrap mb-3">
                          {selectedCoach.metadata.certifications && (
                            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                              {selectedCoach.metadata.certifications}
                            </span>
                          )}
                          {selectedCoach.metadata.experience && (
                            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                              {selectedCoach.metadata.experience}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">About</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {selectedCoach.description || "Dedicated coach committed to youth development through fencing."}
                      </p>
                    </div>

                    {selectedCoach.linkedinUrl && (
                      <div>
                        <a
                          href={selectedCoach.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <span>Connect on LinkedIn</span>
                          →
                        </a>
                      </div>
                    )}

                    {selectedCoach.email && (
                      <div>
                        <a
                          href={`mailto:${selectedCoach.email}`}
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <Mail className="h-4 w-4" />
                          {selectedCoach.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}