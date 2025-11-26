import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  Heart,
  School,
  Medal
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

// Hardcoded scholarship athletes
const scholarshipAthletes = [
  {
    id: 1,
    name: "Gabriel Lazarte",
    school: "Junior",
    bio: "A dedicated fencer with exceptional skill and determination, Gabriel has shown remarkable progress in competitive fencing.",
    achievements: "Regional Champion, State Qualifier",
    imageUrl: "/gabrielLazaret.png",
    scholarshipYear: "2024"
  },
  {
    id: 2,
    name: "Grant Zhou",
    school: "Junior",
    bio: "A passionate athlete committed to excellence in fencing, Grant brings dedication and sportsmanship to every competition.",
    achievements: "Tournament Finalist, Club Champion",
    imageUrl: "/grantZhou.png",
    scholarshipYear: "2024"
  }
];

export default function ScholarshipEndowment() {
  const [selectedAthlete, setSelectedAthlete] = useState<typeof scholarshipAthletes[0] | null>(null);

  // Impact metrics
  const impactMetrics = {
    totalScholarships: 2,
    currentAthletes: 2,
    equipmentProvided: 10,
    competitionsFunded: 5
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Scholarship Program Overview */}
      <section className="bg-background pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Full Scholarships Available
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Empowering Young Athletes
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our scholarship program removes financial barriers, providing complete equipment,
              training, and competition support to promising young fencers.
            </p>
          </div>

        </div>
      </section>

      {/* Three Pillars of Support */}
      <section className="py-10 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Equipment</h3>
              <p className="text-muted-foreground">
                Full fencing gear including mask, jacket, glove, and weapon -
                valued at over $500 per athlete
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <School className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Coaching</h3>
              <p className="text-muted-foreground">
                Year-round training with certified coaches, including individual
                lessons and group classes
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Medal className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competition Support</h3>
              <p className="text-muted-foreground">
                Entry fees, travel assistance, and mentorship for regional
                and national tournaments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Athletes */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Athletes Grid */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-10">
              Meet Our Scholarship Recipients
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {scholarshipAthletes.map((athlete) => (
                <Card
                  key={athlete.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedAthlete(athlete)}
                >
                  <div className="aspect-square relative bg-gradient-to-br from-muted to-muted/50 overflow-hidden max-w-[280px] mx-auto mt-4">
                    <img
                      src={athlete.imageUrl}
                      alt={athlete.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h4 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                      {athlete.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {athlete.school}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Scholarship Program Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Making fencing accessible to talented athletes regardless of financial circumstances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{impactMetrics.totalScholarships}</div>
                <p className="text-sm text-muted-foreground">Total Scholarships Awarded</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{impactMetrics.currentAthletes}</div>
                <p className="text-sm text-muted-foreground">Current Athletes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <School className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{impactMetrics.equipmentProvided}</div>
                <p className="text-sm text-muted-foreground">Equipment Sets Provided</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Medal className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{impactMetrics.competitionsFunded}</div>
                <p className="text-sm text-muted-foreground">Competitions Funded</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Support Our Scholarship Athletes
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Your contribution directly helps young fencers pursue their dreams without financial barriers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Become a Sponsor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Athlete Detail Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{selectedAthlete.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAthlete(null)}
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedAthlete.imageUrl && (
                  <img
                    src={selectedAthlete.imageUrl}
                    alt={selectedAthlete.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h4 className="font-semibold mb-1">School</h4>
                  <p className="text-muted-foreground">{selectedAthlete.school || "High School Student"}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Bio</h4>
                  <p className="text-muted-foreground">{selectedAthlete.bio || "A talented young fencer dedicated to excellence in the sport."}</p>
                </div>
                {selectedAthlete.achievements && (
                  <div>
                    <h4 className="font-semibold mb-1">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {typeof selectedAthlete.achievements === 'string'
                        ? selectedAthlete.achievements.split(',').map((achievement, index) => (
                            <Badge key={index} variant="secondary">
                              {achievement.trim()}
                            </Badge>
                          ))
                        : null
                      }
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}