import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Users, Trophy, Target } from "lucide-react";

export default function Donate() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="py-16 pt-32 bg-background relative">
          <div className="absolute inset-0 gradient-hero"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Help Us Bring Fencing to <span className="text-emerald-400">Everyone</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We're a small nonprofit teaching fencing to kids who couldn't otherwise afford it. Every dollar goes directly to equipment and coaching.
            </p>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                  <div className="text-3xl font-bold text-emerald-400">50+</div>
                  <div className="text-sm text-muted-foreground">Students Served</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                  <div className="text-3xl font-bold text-emerald-400">3</div>
                  <div className="text-sm text-muted-foreground">Scholarship Athletes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                  <div className="text-3xl font-bold text-emerald-400">100%</div>
                  <div className="text-sm text-muted-foreground">To Students</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* GoFundMe Section with Better Layout */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Why Donate */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader className="bg-emerald-500/10">
                    <CardTitle className="text-foreground">Where Your Money Goes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>• Fencing masks, jackets, and weapons for kids who can't afford them</p>
                      <p>• Gym rental at local community centers</p>
                      <p>• Paying our coaches (all former college fencers)</p>
                      <p>• Competition entry fees for promising students</p>
                      <p>• Insurance and safety equipment</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-emerald-500/10">
                    <CardTitle className="text-foreground">Recent Updates</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-semibold text-foreground">November 2024</p>
                        <p className="text-muted-foreground">Started new program at Lincoln Middle School - 15 students enrolled!</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">October 2024</p>
                        <p className="text-muted-foreground">Two students qualified for state championships</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">September 2024</p>
                        <p className="text-muted-foreground">Received donation of 20 masks from local fencing club</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center/Right - GoFundMe Widget */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <Card className="overflow-hidden border-2 border-emerald-500/20 shadow-xl">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4">
                      <h2 className="text-2xl font-bold text-white text-center">
                        Make a Difference Today
                      </h2>
                      <p className="text-emerald-50 text-center text-sm mt-1">
                        Every donation helps a student learn fencing
                      </p>
                    </div>
                    <CardContent className="p-0">
                      <div className="bg-card p-6">
                        <div className="bg-white rounded-lg shadow-inner p-2 border border-border">
                          <iframe
                            src="https://www.gofundme.com/f/fencing-is-for-everyone/widget/large"
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            className="w-full rounded"
                            style={{
                              minHeight: '650px',
                              height: '650px'
                            }}
                          />
                        </div>
                      </div>

                      <div className="bg-muted p-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-muted-foreground">Secure donation via GoFundMe</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                            asChild
                          >
                            <a
                              href="https://www.gofundme.com/f/fencing-is-for-everyone"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Full Page
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}