import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ClassRegistration, EquipmentRequest } from "@shared/schema";
import { Calendar, Package, Trophy, Users } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  const { data: registrations = [] } = useQuery<ClassRegistration[]>({
    queryKey: ["/api/classes/registrations"],
  });

  const { data: requests = [] } = useQuery<EquipmentRequest[]>({
    queryKey: ["/api/equipment/requests/user"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.firstName || 'Fencer'}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your fencing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Registrations</p>
                  <p className="text-2xl font-bold text-foreground">{registrations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-accent" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Equipment Requests</p>
                  <p className="text-2xl font-bold text-foreground">{requests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Skill Level</p>
                  <p className="text-2xl font-bold text-foreground">Beginner</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Community Points</p>
                  <p className="text-2xl font-bold text-foreground">245</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Class Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No active registrations</p>
                  <Button>Register for Classes</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.map((registration) => (
                    <div key={registration.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{registration.programType}</h3>
                      <p className="text-sm text-muted-foreground">
                        Age Group: {registration.ageGroup} • Experience: {registration.experience}
                      </p>
                      <p className="text-sm text-emerald-600 font-medium mt-2">
                        Status: {registration.status}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No equipment requests</p>
                  <Button>Browse Marketplace</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">Request #{request.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.message || 'No message provided'}
                      </p>
                      <p className="text-sm text-blue-600 font-medium mt-2">
                        Status: {request.status}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Register for Classes
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Package className="h-6 w-6 mb-2" />
                  Browse Equipment
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Trophy className="h-6 w-6 mb-2" />
                  View Programs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
