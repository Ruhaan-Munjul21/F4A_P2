import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-300">Fencing for Everyone</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Breaking down barriers and making the sport of fencing accessible to students from all backgrounds since 2018.
            </p>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2018 by a group of passionate fencers who believed that economic barriers shouldn't prevent talented students from discovering their potential in sport, Fencing for Everyone has grown from a small community initiative to a comprehensive nonprofit organization.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  What started as weekend classes in a borrowed gym has evolved into a full program offering free instruction, equipment loans, competition opportunities, and a supportive community that has transformed the lives of nearly 3,000 students.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we operate multiple training centers, partner with schools and community organizations, and have created a sustainable model for making fencing truly accessible to everyone.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Fencing students in training" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape our approach to making fencing accessible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    Every student, regardless of background, deserves the opportunity to discover their potential through sport.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Excellence</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards in instruction, safety, and student development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
                  <p className="text-muted-foreground">
                    Building strong relationships and support networks that extend far beyond the sport.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Empowerment</h3>
                  <p className="text-muted-foreground">
                    Teaching skills, confidence, and life lessons that students carry into all areas of their lives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how our programs are making a real difference in students' lives and communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2,847</div>
                <div className="text-muted-foreground">Students Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">1,234</div>
                <div className="text-muted-foreground">Equipment Items Donated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-muted-foreground">Free Classes Offered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">89</div>
                <div className="text-muted-foreground">Active Volunteers</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Academic Achievement</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">95%</div>
                      <div className="text-muted-foreground">of participants improve their grades</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emerald-600">87%</div>
                      <div className="text-muted-foreground">graduate high school on time</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">73%</div>
                      <div className="text-muted-foreground">pursue higher education</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Life Skills Development</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">98%</div>
                      <div className="text-muted-foreground">report increased confidence</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emerald-600">92%</div>
                      <div className="text-muted-foreground">improve discipline and focus</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">89%</div>
                      <div className="text-muted-foreground">develop leadership skills</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated professionals and volunteers who make our mission possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Sarah Johnson" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Sarah Johnson</h3>
                  <p className="text-primary font-medium mb-2">Executive Director</p>
                  <p className="text-sm text-muted-foreground">
                    Former Olympic fencer with 15 years of coaching experience. Passionate about making fencing accessible to all.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Michael Chen" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Michael Chen</h3>
                  <p className="text-primary font-medium mb-2">Head Coach</p>
                  <p className="text-sm text-muted-foreground">
                    National champion and certified instructor with expertise in youth development and competitive training.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b5c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Maria Rodriguez" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Maria Rodriguez</h3>
                  <p className="text-primary font-medium mb-2">Program Coordinator</p>
                  <p className="text-sm text-muted-foreground">
                    Manages our community outreach and ensures every student has access to the resources they need.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether as a student, volunteer, donor, or partner, there are many ways to be part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                Get Involved
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
