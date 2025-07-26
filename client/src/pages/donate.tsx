import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Heart, Shirt, HandHeart, Building, DollarSign, CreditCard } from "lucide-react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const { toast } = useToast();

  const donateMutation = useMutation({
    mutationFn: async (donationData: any) => {
      return await apiRequest("POST", "/api/donations", donationData);
    },
    onSuccess: () => {
      toast({
        title: "Thank You!",
        description: "Your donation is being processed. You'll receive a receipt via email.",
      });
      setAmount("");
      setDonorName("");
      setDonorEmail("");
      setIsRecurring(false);
    },
    onError: () => {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDonate = () => {
    if (!amount || !donorName || !donorEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    donateMutation.mutate({
      amount: parseFloat(amount),
      isRecurring,
      donorName,
      donorEmail,
    });
  };

  const selectAmount = (selectedAmount: string) => {
    setAmount(selectedAmount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Support Our <span className="text-yellow-300">Mission</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your donation helps provide free fencing classes, equipment, and opportunities to students who need them most.
            </p>
          </div>
        </section>

        {/* Donation Options */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Financial Donations */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
                    <Heart className="h-6 w-6 mr-3 text-red-500" />
                    Financial Donations
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Button 
                      variant={amount === "25" ? "default" : "outline"}
                      onClick={() => selectAmount("25")}
                      className="p-4 h-auto flex-col"
                    >
                      <div className="text-xl font-bold">$25</div>
                      <div className="text-sm">Basic gear for one student</div>
                    </Button>
                    <Button 
                      variant={amount === "50" ? "default" : "outline"}
                      onClick={() => selectAmount("50")}
                      className="p-4 h-auto flex-col"
                    >
                      <div className="text-xl font-bold">$50</div>
                      <div className="text-sm">One month of classes</div>
                    </Button>
                    <Button 
                      variant={amount === "100" ? "default" : "outline"}
                      onClick={() => selectAmount("100")}
                      className="p-4 h-auto flex-col"
                    >
                      <div className="text-xl font-bold">$100</div>
                      <div className="text-sm">Complete starter kit</div>
                    </Button>
                    <Button 
                      variant={amount && !["25", "50", "100"].includes(amount) ? "default" : "outline"}
                      onClick={() => setAmount("")}
                      className="p-4 h-auto flex-col"
                    >
                      <div className="text-xl font-bold">Custom</div>
                      <div className="text-sm">Choose your amount</div>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Donation Amount
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Enter custom amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input
                        placeholder="Full name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="monthly" 
                        checked={isRecurring}
                        onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
                      />
                      <label htmlFor="monthly" className="text-sm text-foreground">
                        Make this a monthly recurring donation
                      </label>
                    </div>

                    <Button 
                      onClick={handleDonate}
                      disabled={donateMutation.isPending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {donateMutation.isPending ? "Processing..." : "Donate Now - Tax Deductible"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Other Ways to Help */}
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                      <Shirt className="h-5 w-5 mr-3 text-blue-500" />
                      Donate Equipment
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Clean out your gear closet and give equipment a new life with students who need it. Every piece of equipment donated helps a student participate in our programs.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Needed:</span>
                        <span className="text-muted-foreground">Masks, jackets, gloves, weapons, bags</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Condition:</span>
                        <span className="text-muted-foreground">Good to excellent condition preferred</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      List Equipment for Donation
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                      <HandHeart className="h-5 w-5 mr-3 text-purple-500" />
                      Volunteer with Us
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Share your skills and passion with students. We need coaches, mentors, event helpers, and administrative support volunteers.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Time:</span>
                        <span className="text-muted-foreground">2-4 hours per week (flexible scheduling)</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Training:</span>
                        <span className="text-muted-foreground">Complete orientation program provided</span>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Apply to Volunteer
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-foreground">
                      <Building className="h-5 w-5 mr-3 text-green-500" />
                      Corporate Sponsorship
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Partner with us to make a bigger impact while gaining valuable community visibility and supporting youth development.
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Benefits:</span>
                        <span className="text-muted-foreground">Logo placement, event naming rights, tax benefits</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Levels:</span>
                        <span className="text-muted-foreground">Bronze ($1K), Silver ($5K), Gold ($10K+)</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Partnership Opportunities
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Tracking Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact Together
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how your donations have directly supported our community and created opportunities for students.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">847</div>
                  <div className="text-muted-foreground font-medium">Students Served</div>
                  <div className="text-sm text-muted-foreground mt-2">Since 2020</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-emerald-600/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">$125K</div>
                  <div className="text-muted-foreground font-medium">Total Raised</div>
                  <div className="text-sm text-muted-foreground mt-2">In 2024</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-600/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">2,400</div>
                  <div className="text-muted-foreground font-medium">Equipment Pieces</div>
                  <div className="text-sm text-muted-foreground mt-2">Donated & Distributed</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-600/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">15</div>
                  <div className="text-muted-foreground font-medium">School Programs</div>
                  <div className="text-sm text-muted-foreground mt-2">Active Partnerships</div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Breakdown */}
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                How Your Donation Makes a Difference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">$25</div>
                    <div className="text-muted-foreground">Provides basic protective gear for one student for a full semester</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">$50</div>
                    <div className="text-muted-foreground">Covers one month of instruction and facility costs for one student</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">$100</div>
                    <div className="text-muted-foreground">Funds a complete starter kit including weapon, mask, and jacket</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">$250</div>
                    <div className="text-muted-foreground">Sponsors one student for an entire summer camp program</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Endowment Information */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Fencing for Everyone <span className="text-primary">Endowment</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Building a sustainable future for fencing accessibility through our growing endowment fund.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Card className="border-2 border-primary/20 bg-white/80 dark:bg-background/80">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Our Endowment Goal
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Current Endowment</span>
                        <span className="text-2xl font-bold text-primary">$2.3M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Target Goal</span>
                        <span className="text-2xl font-bold text-emerald-600">$5M</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-primary to-emerald-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: '46%' }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground text-center">
                        46% of our $5M goal reached
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-background/80">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Why an Endowment?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          <strong>Sustainability:</strong> Ensures our programs continue regardless of economic conditions
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          <strong>Growth:</strong> Allows us to expand to more schools and serve more students
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          <strong>Impact:</strong> Provides stable funding for equipment, coaching, and facilities
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-background/80">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Legacy Giving Options
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold text-foreground">Named Scholarship Fund</h4>
                        <p className="text-sm text-muted-foreground">$10,000+ creates a permanent scholarship in your name</p>
                      </div>
                      <div className="border-l-4 border-emerald-600 pl-4">
                        <h4 className="font-semibold text-foreground">Equipment Endowment</h4>
                        <p className="text-sm text-muted-foreground">$25,000+ ensures permanent equipment funding</p>
                      </div>
                      <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-foreground">Program Endowment</h4>
                        <p className="text-sm text-muted-foreground">$50,000+ funds a complete program in perpetuity</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-background/80">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Annual Income Distribution
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Student Programs</span>
                        <span className="font-semibold">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Equipment & Facilities</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coaching & Training</span>
                        <span className="font-semibold">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Administrative</span>
                        <span className="font-semibold">5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white">
                  Learn More About Legacy Giving
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Information */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="border-dashed border-2 border-primary">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Tax-Deductible Donation Information
                </h3>
                <p className="text-muted-foreground mb-4">
                  Fencing for Everyone is a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the full extent allowed by law.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Tax ID:</strong> 12-3456789<br />
                    <strong>EIN:</strong> 12-3456789<br />
                    <strong>Legal Name:</strong> Fencing for Everyone Inc.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  You will receive a tax receipt via email immediately after your donation is processed.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
