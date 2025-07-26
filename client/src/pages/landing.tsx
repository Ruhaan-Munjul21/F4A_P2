import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { MarketplaceItem } from "@shared/schema";
import { Users, Trophy, GraduationCap, Heart, Shirt, HandHeart, Building } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  const { data: marketplaceItems = [] } = useQuery<MarketplaceItem[]>({
    queryKey: ["/api/marketplace/items"],
  });

  const featuredItems = marketplaceItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />
      
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
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white transition-colors cursor-pointer">
                    <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Our Story: Making Fencing Accessible
                  </h3>
                  <p className="text-muted-foreground">
                    Click to watch our 3-minute introduction video
                  </p>
                </div>
              </div>
              {/* Placeholder for actual video - replace with real video URL */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                "This program changed my life. I never thought I'd be able to afford fencing lessons, but now I'm competing at the state level." 
                <br />
                <span className="font-medium">— Sarah M., Program Graduate</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission: <span className="text-primary">Breaking Barriers in Sport</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2018, Fencing for Everyone emerged from a simple belief: every student deserves the opportunity to discover their potential through sport, regardless of their economic background.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Through our comprehensive programs, we provide free fencing instruction, equipment loans, and a supportive community that helps students build confidence, discipline, and lifelong friendships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Learn More About Us
                </Button>
                <Button variant="outline" size="lg">
                  View Our Impact Report
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Students learning fencing fundamentals" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Classes are FREE</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main feature image */}
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="relative h-80 lg:h-full rounded-xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Students in fencing class learning proper stance and technique" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-2">Youth Fencing Program</h3>
                  <p className="text-sm opacity-90">Students ages 8-17 learning fundamentals in our after-school program</p>
                </div>
              </div>
            </div>

            {/* Equipment showcase */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Professional fencing equipment including masks, jackets, and weapons" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Quality Equipment</h3>
                <p className="text-sm opacity-90">Professional-grade gear for all students</p>
              </div>
            </div>

            {/* Competition preparation */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Young fencer in competition gear ready for tournament" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Competition Ready</h3>
                <p className="text-sm opacity-90">Advanced training for tournaments</p>
              </div>
            </div>

            {/* Community event */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Community fencing event with students, families, and volunteers" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Community Events</h3>
                <p className="text-sm opacity-90">Bringing families together through sport</p>
              </div>
            </div>

            {/* Mentorship moment */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Instructor providing one-on-one coaching to a young student" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1">Personal Coaching</h3>
                <p className="text-sm opacity-90">Individual attention for every student</p>
              </div>
            </div>

            {/* Achievement celebration */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Students celebrating achievement with medals and trophies" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
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

      {/* Marketplace Preview */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Gear <span className="text-primary">Marketplace</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with our community to donate, find, or request fencing equipment. Help gear find its next home while supporting fellow fencers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted-foreground/10 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                    <Badge variant={item.condition === 'new' ? 'default' : item.condition === 'like new' ? 'secondary' : 'outline'}>
                      {item.condition}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                  <Button size="sm" className="w-full">
                    Request
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Shirt className="h-4 w-4 mr-2" />
              View Full Marketplace
            </Button>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Support Our <span className="text-yellow-300">Mission</span>
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Your donation helps provide free fencing classes, equipment, and opportunities to students who need them most.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center text-white">
                  <Heart className="h-6 w-6 mr-3 text-yellow-300" />
                  Financial Donations
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 p-4 h-auto flex-col">
                    <div className="text-xl font-bold">$25</div>
                    <div className="text-sm">Basic gear for one student</div>
                  </Button>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 p-4 h-auto flex-col">
                    <div className="text-xl font-bold">$50</div>
                    <div className="text-sm">One month of classes</div>
                  </Button>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 p-4 h-auto flex-col">
                    <div className="text-xl font-bold">$100</div>
                    <div className="text-sm">Complete starter kit</div>
                  </Button>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 p-4 h-auto flex-col">
                    <div className="text-xl font-bold">Custom</div>
                    <div className="text-sm">Choose your amount</div>
                  </Button>
                </div>
                <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                  Donate Now - Tax Deductible
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                    <Shirt className="h-5 w-5 mr-3 text-yellow-300" />
                    Donate Equipment
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Clean out your gear closet and give equipment a new life with students who need it.
                  </p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    List Equipment
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                    <HandHeart className="h-5 w-5 mr-3 text-yellow-300" />
                    Volunteer
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Share your skills and passion with students. We need coaches, mentors, and event helpers.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Join Our Team
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                    <Building className="h-5 w-5 mr-3 text-yellow-300" />
                    Corporate Sponsorship
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Partner with us to make a bigger impact while gaining valuable community visibility.
                  </p>
                  <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-blue-100 text-sm">
              Fencing for Everyone is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the full extent allowed by law.
              <br />
              Tax ID: 12-3456789
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
