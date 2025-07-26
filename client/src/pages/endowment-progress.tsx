import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Target, Calendar, ArrowUpRight, Heart } from "lucide-react";
import { Link } from "wouter";

export default function EndowmentProgress() {
  // Endowment data - in a real app, this would come from an API
  const endowmentData = {
    currentAmount: 2300000, // $2.3M
    goalAmount: 5000000,    // $5M
    yearlyDistribution: 115000, // 5% of current endowment
    studentsSupported: 847,
    programsExpanded: 3,
    recentDonations: [
      { amount: 50000, donor: "Anonymous Foundation", date: "2024-12-15", type: "Major Gift" },
      { amount: 25000, donor: "Johnson Family Foundation", date: "2024-12-10", type: "Family Foundation" },
      { amount: 15000, donor: "Community Fundraising Event", date: "2024-12-01", type: "Event Proceeds" },
      { amount: 10000, donor: "Corporate Sponsor", date: "2024-11-28", type: "Corporate Gift" },
      { amount: 5000, donor: "Alumni Giving Campaign", date: "2024-11-20", type: "Alumni Gift" },
    ],
    milestones: [
      { amount: 1000000, date: "2022-06-15", description: "First $1M milestone reached", achieved: true },
      { amount: 2000000, date: "2024-03-20", description: "Second $1M milestone reached", achieved: true },
      { amount: 3000000, date: "2025-06-01", description: "Halfway to our goal", achieved: false },
      { amount: 4000000, date: "2026-12-01", description: "80% of goal achieved", achieved: false },
      { amount: 5000000, date: "2027-12-31", description: "Full endowment goal reached", achieved: false },
    ],
    impactMetrics: {
      studentsPerYear: 847,
      averageCostPerStudent: 850,
      programsOffered: 5,
      equipmentSetsProvided: 324,
      scholarshipsAwarded: 45,
    }
  };

  const progressPercentage = (endowmentData.currentAmount / endowmentData.goalAmount) * 100;
  const remainingAmount = endowmentData.goalAmount - endowmentData.currentAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Endowment <span className="text-primary">Progress</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Track our journey to building a sustainable $5 million endowment that will provide free fencing programs for generations to come.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Progress Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Endowment Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-foreground">
                    {formatCompactCurrency(endowmentData.currentAmount)}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    of {formatCompactCurrency(endowmentData.goalAmount)} goal
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{progressPercentage.toFixed(1)}% complete</span>
                  <span>{formatCompactCurrency(remainingAmount)} remaining</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {formatCompactCurrency(endowmentData.yearlyDistribution)}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Distribution</div>
                  <div className="text-xs text-muted-foreground">5% of current endowment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {endowmentData.studentsSupported}
                  </div>
                  <div className="text-sm text-muted-foreground">Students Supported</div>
                  <div className="text-xs text-muted-foreground">This year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">15%</div>
                    <div className="text-sm text-muted-foreground">Growth this year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">324</div>
                    <div className="text-sm text-muted-foreground">Donors this year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">2027</div>
                    <div className="text-sm text-muted-foreground">Target completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Metrics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Current Impact
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              What our endowment funding accomplishes each year
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {endowmentData.impactMetrics.studentsPerYear}
                </div>
                <div className="text-sm text-muted-foreground">Students Served Annually</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {formatCompactCurrency(endowmentData.impactMetrics.averageCostPerStudent)}
                </div>
                <div className="text-sm text-muted-foreground">Cost Per Student</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {endowmentData.impactMetrics.programsOffered}
                </div>
                <div className="text-sm text-muted-foreground">Program Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {endowmentData.impactMetrics.equipmentSetsProvided}
                </div>
                <div className="text-sm text-muted-foreground">Equipment Sets Provided</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {endowmentData.impactMetrics.scholarshipsAwarded}
                </div>
                <div className="text-sm text-muted-foreground">Competition Scholarships</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Recent Major Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endowmentData.recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-semibold text-foreground">{donation.donor}</div>
                      <div className="text-sm text-muted-foreground">{donation.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{formatCurrency(donation.amount)}</div>
                      <Badge variant="outline" className="text-xs">{donation.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Endowment Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endowmentData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      milestone.achieved ? 'bg-emerald-500' : 'bg-muted-foreground/30'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${
                          milestone.achieved ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {formatCompactCurrency(milestone.amount)}
                        </span>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      <div className={`text-sm ${
                        milestone.achieved ? 'text-muted-foreground' : 'text-muted-foreground/70'
                      }`}>
                        {milestone.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-emerald-600/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Help Us Reach Our Goal
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every donation to our endowment creates lasting impact. With {formatCompactCurrency(remainingAmount)} remaining, 
              we're on track to secure free fencing programs for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/donate">
                  Contribute to Endowment
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Learn About Legacy Giving</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}