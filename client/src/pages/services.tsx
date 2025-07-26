import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Users, 
  GraduationCap, 
  Trophy, 
  Calendar, 
  Clock, 
  MapPin,
  Star,
  Shield,
  Target
} from "lucide-react";

export default function Services() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (programData: any) => {
      return await apiRequest("POST", "/api/classes/register", programData);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "We'll contact you soon with class details.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/classes/registrations"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please Log In",
          description: "You need to be logged in to register for classes.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRegister = (programType: string, ageGroup: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Please Log In",
        description: "You need to be logged in to register for classes.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    registerMutation.mutate({
      programType,
      ageGroup,
      experience: "beginner",
      emergencyContact: "Parent/Guardian",
      emergencyPhone: "(555) 000-0000",
      medicalInfo: "None",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-yellow-300">Free</span> Programs
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive fencing programs designed for all skill levels and age groups, completely free of charge.
            </p>
          </div>
        </section>

        {/* Main Programs */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Youth Classes */}
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">Youth Classes</h3>
                    <Badge className="bg-emerald-600">FREE</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Age-appropriate instruction focusing on fundamentals, safety, and fun while building confidence and discipline.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>Ages 8-17 • All skill levels</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>Weekends & After-school</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      <span>All equipment provided</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      <span>Certified instructors</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleRegister("Youth Classes", "8-12")}
                      disabled={registerMutation.isPending}
                    >
                      Register Ages 8-12
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleRegister("Youth Classes", "13-17")}
                      disabled={registerMutation.isPending}
                    >
                      Register Ages 13-17
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Summer Camps */}
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-emerald-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">Summer Camps</h3>
                    <Badge className="bg-emerald-600">FREE</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Intensive week-long camps combining fencing instruction with character building and social activities.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>June - August • 5-day programs</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>9 AM - 4 PM daily</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>Meals & snacks included</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>Take-home starter kit</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleRegister("Summer Camp", "All Ages")}
                    disabled={registerMutation.isPending}
                  >
                    Apply for Summer Camp
                  </Button>
                </CardContent>
              </Card>

              {/* Competition Training */}
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">Competition Team</h3>
                    <Badge className="bg-emerald-600">FREE</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Advanced training for students interested in competitive fencing, with tournament opportunities.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm">
                      <Target className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Regional competitions</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Advanced technique training</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Trophy className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Mental preparation</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Scholarship opportunities</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleRegister("Competition Team", "Advanced")}
                    disabled={registerMutation.isPending}
                  >
                    Join Competition Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Class Schedule
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All classes are held at our main training center with flexible scheduling options.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Weekday Classes</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="text-muted-foreground">4:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Ages 8-12</span>
                      <span className="text-muted-foreground">4:00 PM - 5:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Ages 13-17</span>
                      <span className="text-muted-foreground">6:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Competition Team</span>
                      <span className="text-muted-foreground">7:00 PM - 9:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Weekend Classes</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Saturday</span>
                      <span className="text-muted-foreground">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Beginner Classes</span>
                      <span className="text-muted-foreground">9:00 AM - 11:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="font-medium">Intermediate Classes</span>
                      <span className="text-muted-foreground">11:30 AM - 1:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Open Practice</span>
                      <span className="text-muted-foreground">2:00 PM - 5:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Training Locations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We operate multiple training centers to serve our community better.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Main Training Center</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>123 Community Center Drive</p>
                    <p>Anytown, ST 12345</p>
                    <p className="font-medium text-foreground mt-4">Facilities:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>4 regulation fencing strips</li>
                      <li>Complete equipment room</li>
                      <li>Changing rooms & lockers</li>
                      <li>Parent viewing area</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">East Side Location</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p>456 School District Gym</p>
                    <p>Easttown, ST 12346</p>
                    <p className="font-medium text-foreground mt-4">Facilities:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>2 regulation fencing strips</li>
                      <li>Equipment storage</li>
                      <li>Gymnasium setting</li>
                      <li>Weekend classes only</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Getting Started
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about joining our programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">What We Provide</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 text-emerald-600 mr-2" />
                      <span>All fencing equipment (mask, jacket, gloves, weapon)</span>
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-emerald-600 mr-2" />
                      <span>Professional instruction</span>
                    </li>
                    <li className="flex items-center">
                      <Trophy className="h-4 w-4 text-emerald-600 mr-2" />
                      <span>Competition opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-emerald-600 mr-2" />
                      <span>Supportive community</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">What You Need</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Target className="h-4 w-4 text-primary mr-2" />
                      <span>Athletic shoes (no cleats)</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="h-4 w-4 text-primary mr-2" />
                      <span>Comfortable athletic clothing</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="h-4 w-4 text-primary mr-2" />
                      <span>Water bottle</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="h-4 w-4 text-primary mr-2" />
                      <span>Positive attitude and willingness to learn</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
