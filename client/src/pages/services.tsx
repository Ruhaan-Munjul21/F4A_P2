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
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";
import {
  Users,
  GraduationCap,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  Star,
  Shield,
  Target,
  Upload
} from "lucide-react";

export default function Services() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: mediaFiles = [] } = useMedia();

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

  // Get images for each section
  const programsHeroImages = getImagesByCategory(mediaFiles, 'programs-hero');
  const youthClassImages = getImagesByCategory(mediaFiles, 'youth-classes');
  const summerCampImages = getImagesByCategory(mediaFiles, 'summer-camps');
  const competitionTeamImages = getImagesByCategory(mediaFiles, 'competition-team');

  // Debug: Log what images we found
  console.log('Media files loaded:', mediaFiles.length);
  console.log('Programs hero images:', programsHeroImages);
  console.log('Youth class images:', youthClassImages);
  console.log('Summer camp images:', summerCampImages);
  console.log('Competition team images:', competitionTeamImages);

  const programsHeroUrl = programsHeroImages.length > 0
    ? getMediaUrl(programsHeroImages[0].filePath)
    : "https://images.unsplash.com/photo-1606924842584-ffa79285b531?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600";

  const youthClassImageUrl = youthClassImages.length > 0
    ? getMediaUrl(youthClassImages[0].filePath)
    : null;

  const summerCampImageUrl = summerCampImages.length > 0
    ? getMediaUrl(summerCampImages[0].filePath)
    : null;

  const competitionTeamImageUrl = competitionTeamImages.length > 0
    ? getMediaUrl(competitionTeamImages[0].filePath)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section with Image */}
        <section
          className="relative py-20 text-white overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${programsHeroUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-yellow-300">Free</span> Programs
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Comprehensive fencing programs designed for all skill levels and age groups, completely free of charge.
            </p>
            <div className="mt-4 text-sm text-gray-300">
              <p>Year-long Saturday Classes: 3:00 PM - 5:00 PM at Factory 220</p>
              <p>Summer Camp (3 weeks): 3:00 PM - 6:00 PM</p>
            </div>
          </div>
        </section>

        {/* Main Programs */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Youth Classes */}
              <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                {youthClassImageUrl && (
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={youthClassImageUrl}
                      alt="Youth Classes"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                {!youthClassImageUrl && (
                  <div className="h-56 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload "youth-classes" image in admin</p>
                    </div>
                  </div>
                )}
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
                      <span>Saturdays 3-5 PM • Year-round</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>Factory 220, Passaic</span>
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
              <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                {summerCampImageUrl && (
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={summerCampImageUrl}
                      alt="Summer Camps"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                {!summerCampImageUrl && (
                  <div className="h-56 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload "summer-camps" image in admin</p>
                    </div>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="bg-emerald-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">Summer Camps</h3>
                    <Badge className="bg-emerald-600">FREE</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Intensive 3-week summer camps combining fencing instruction with character building and social activities.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>3-week programs • Summer</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>3:00 PM - 6:00 PM daily</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>Both locations</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>Snacks included</span>
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
              <Card className="hover:shadow-xl transition-shadow overflow-hidden">
                {competitionTeamImageUrl && (
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={competitionTeamImageUrl}
                      alt="Competition Team"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                {!competitionTeamImageUrl && (
                  <div className="h-56 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload "competition-team" image in admin</p>
                    </div>
                  </div>
                )}
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

        {/* Schedule & Locations */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Class Schedule & Locations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Year-round programs at two convenient locations in New Jersey
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Regular Classes</h3>
                  <div className="space-y-4">
                    <div className="py-3 border-b border-border">
                      <p className="font-semibold text-lg mb-2">Year-Long Saturday Program</p>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Every Saturday, 3:00 PM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Factory 220, Passaic</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>September - June</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Summer Programs</h3>
                  <div className="space-y-4">
                    <div className="py-3 border-b border-border">
                      <p className="font-semibold text-lg mb-2">3-Week Summer Camp</p>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Monday - Friday, 3:00 PM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Both locations</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>June - August (3 sessions)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location with Maps */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Training Locations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Two convenient locations to serve the Passaic and Bergen County communities
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Location 1 - Factory 220 */}
              <Card className="overflow-hidden">
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.123456!2d-74.123456!3d40.859270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s220+Passaic+St%2C+Passaic%2C+NJ+07055!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Factory 220 Location"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Factory 220 - Main Location</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="font-medium text-foreground">Address:</p>
                    <p>220 Passaic St</p>
                    <p>Passaic, NJ 07055</p>

                    <p className="font-medium text-foreground mt-4">Programs at this location:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Year-long Saturday Classes (3-5 PM)</li>
                      <li>Summer Camp Sessions</li>
                      <li>Competition Team Training</li>
                    </ul>

                    <div className="mt-4">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=220+Passaic+St,+Passaic,+NJ+07055"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location 2 - Garfield */}
              <Card className="overflow-hidden">
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.654321!2d-74.109876!3d40.859270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s60+Saddle+River+Ave%2C+Garfield%2C+NJ+07026!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Garfield Location"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Garfield Location</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="font-medium text-foreground">Address:</p>
                    <p>60 Saddle River Ave</p>
                    <p>Garfield, NJ 07026</p>

                    <p className="font-medium text-foreground mt-4">Programs at this location:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Summer Camp Sessions</li>
                      <li>Special workshops</li>
                      <li>Equipment distribution</li>
                    </ul>

                    <div className="mt-4">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=60+Saddle+River+Ave,+Garfield,+NJ+07026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Both locations offer free parking and are accessible by public transportation.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}