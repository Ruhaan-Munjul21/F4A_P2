import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, Heart, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function EndowmentProgress() {
  // Endowment data - simplified and focused
  const endowmentData = {
    totalValue: 2750000, // Current market value
    yearEstablished: 2022,
    annualReturn: 8.2, // Average annual return percentage
    yearlyDistribution: 115000, // Annual distribution to programs
    totalDistributed: 345000, // Total distributed since inception

    // Impact metrics
    studentsServed: 2847,
    programsFunded: 12,
    scholarshipsAwarded: 145,

    // Major donors
    majorDonors: 47,
    totalContributions: 2300000
  };

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

      {/* Clean Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Endowment Fund
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building a sustainable foundation for free fencing education since {endowmentData.yearEstablished}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Stats - Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {formatCompactCurrency(endowmentData.totalValue)}
              </div>
              <div className="text-sm text-muted-foreground">Total Fund Value</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {endowmentData.annualReturn}%
              </div>
              <div className="text-sm text-muted-foreground">Average Annual Return</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {formatCompactCurrency(endowmentData.yearlyDistribution)}
              </div>
              <div className="text-sm text-muted-foreground">Annual Distribution</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {endowmentData.studentsServed.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Students Served</div>
            </CardContent>
          </Card>
        </div>

        {/* About the Endowment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our endowment fund is professionally managed to generate sustainable returns while preserving capital for future generations.
              </p>
              <p>
                Each year, we distribute 5% of the fund's value to support our free fencing programs, ensuring that financial barriers never prevent talented young people from discovering their potential.
              </p>
              <p>
                Since {endowmentData.yearEstablished}, we've distributed {formatCompactCurrency(endowmentData.totalDistributed)} to fund programs, equipment, and scholarships, while growing the principal through careful investment and generous contributions.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Impact
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{endowmentData.studentsServed.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total students provided free fencing education</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{endowmentData.programsFunded}</div>
                  <div className="text-sm text-muted-foreground">Programs created and sustained</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{endowmentData.scholarshipsAwarded}</div>
                  <div className="text-sm text-muted-foreground">Competition scholarships awarded</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Contributions</div>
                <div className="text-2xl font-bold text-foreground">{formatCompactCurrency(endowmentData.totalContributions)}</div>
                <div className="text-xs text-muted-foreground mt-1">From {endowmentData.majorDonors} major donors</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Current Market Value</div>
                <div className="text-2xl font-bold text-foreground">{formatCompactCurrency(endowmentData.totalValue)}</div>
                <div className="text-xs text-emerald-600 mt-1">+{endowmentData.annualReturn}% annual return</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Distributed</div>
                <div className="text-2xl font-bold text-foreground">{formatCompactCurrency(endowmentData.totalDistributed)}</div>
                <div className="text-xs text-muted-foreground mt-1">Since {endowmentData.yearEstablished}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donor Recognition */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Our Generous Supporters
          </h2>
          <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-emerald-600/5">
            <CardContent className="p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground mb-6">
                  We are deeply grateful to the {endowmentData.majorDonors} major donors who have contributed to building this endowment.
                  Their vision and generosity ensure that fencing remains accessible to all students, regardless of their financial circumstances.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Heart className="h-5 w-5" />
                  <span className="font-semibold">Thank you for believing in our mission</span>
                  <Heart className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join Us in Building the Future
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your contribution to the endowment creates lasting impact. Every dollar invested today will support students for generations to come.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-bold text-lg text-foreground">$10,000</div>
                <div className="text-sm text-muted-foreground">Funds 10 students annually forever</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-bold text-lg text-foreground">$50,000</div>
                <div className="text-sm text-muted-foreground">Sustains a full program in perpetuity</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-bold text-lg text-foreground">$100,000+</div>
                <div className="text-sm text-muted-foreground">Creates named scholarship fund</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/donate">
                  Contribute to the Endowment
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}