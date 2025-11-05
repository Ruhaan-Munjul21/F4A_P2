import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Trophy,
  GraduationCap,
  Award,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Heart,
  Star,
  School,
  Medal,
  Upload,
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  Filter
} from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";
import { useScholarshipAthletes } from "@/hooks/useScholarshipAthletes";

// Endowment fund data
const endowmentFunds = [
  {
    id: 1,
    name: "Fencing For Everyone Foundation",
    estimatedAUM: 61600000,
    oneYearReturn: 10.5,
    previousFYReturn: 4.7,
    threeYearReturn: 2.8,
    fiveYearReturn: 9.4,
    tenYearReturn: 7.7,
    twentyYearReturn: null,
    category: "primary"
  },
  {
    id: 2,
    name: "Youth Athletics Permanent Fund",
    estimatedAUM: 57380000,
    oneYearReturn: 10.1,
    previousFYReturn: 6.1,
    threeYearReturn: null,
    fiveYearReturn: 7.3,
    tenYearReturn: 6.3,
    twentyYearReturn: null,
    category: "youth"
  },
  {
    id: 3,
    name: "Equipment & Accessibility Fund",
    estimatedAUM: 45200000,
    oneYearReturn: 8.9,
    previousFYReturn: 5.2,
    threeYearReturn: 3.1,
    fiveYearReturn: 8.2,
    tenYearReturn: 7.1,
    twentyYearReturn: 5.8,
    category: "equipment"
  },
  {
    id: 4,
    name: "Coaching Excellence Endowment",
    estimatedAUM: 32150000,
    oneYearReturn: 9.3,
    previousFYReturn: 4.9,
    threeYearReturn: 2.5,
    fiveYearReturn: 7.8,
    tenYearReturn: 6.9,
    twentyYearReturn: null,
    category: "coaching"
  },
  {
    id: 5,
    name: "Community Outreach Fund",
    estimatedAUM: 28900000,
    oneYearReturn: 7.8,
    previousFYReturn: 3.8,
    threeYearReturn: 1.9,
    fiveYearReturn: 6.5,
    tenYearReturn: 5.7,
    twentyYearReturn: null,
    category: "community"
  }
];

export default function ScholarshipEndowment() {
  const { data: scholarshipAthletes = [], isLoading: athletesLoading } = useScholarshipAthletes();
  const [selectedAthlete, setSelectedAthlete] = useState<typeof scholarshipAthletes[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const { data: mediaFiles = [] } = useMedia();

  // Get scholarship athlete images
  const scholarshipImages = getImagesByCategory(mediaFiles, 'scholarship-athletes');

  // Calculate total endowment
  const totalEndowment = endowmentFunds.reduce((sum, fund) => sum + fund.estimatedAUM, 0);

  // Calculate percentages for pie chart
  const fundBreakdown = endowmentFunds.map(fund => ({
    ...fund,
    percentage: (fund.estimatedAUM / totalEndowment) * 100
  }));

  // Sort and filter functions
  const sortedFunds = useMemo(() => {
    let sorted = [...endowmentFunds];

    if (searchTerm) {
      sorted = sorted.filter(fund =>
        fund.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig) {
      sorted.sort((a, b) => {
        const aVal = a[sortConfig.key] || 0;
        const bVal = b[sortConfig.key] || 0;

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [searchTerm, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(current =>
      current.includes(id)
        ? current.filter(rowId => rowId !== id)
        : [...current, id]
    );
  };

  // Growth data for bar chart
  const growthData = [
    { year: '1-year', value: 3.2 },
    { year: '3-year', value: 5.8 },
    { year: '5-year', value: 7.1 },
    { year: '10-year', value: 6.9 },
    { year: '15-year', value: 7.3 },
    { year: '20-year', value: 7.8 }
  ];

  // Impact metrics
  const impactMetrics = {
    totalScholarships: 12,
    currentAthletes: 8,
    equipmentProvided: 50,
    competitionsFunded: 15
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header Section */}
      <section className="bg-white border-b pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Endowment Overview</h1>
              <p className="text-gray-600 mt-1">Fencing For Everyone Foundation Endowments</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Request Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Donut Chart Card */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Endowment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* SVG Donut Chart */}
                  <svg viewBox="0 0 200 200" className="w-full max-w-sm mx-auto">
                    {(() => {
                      let cumulativePercentage = 0;
                      const radius = 80;
                      const centerX = 100;
                      const centerY = 100;
                      const colors = ['#4A90A4', '#67B3CC', '#FDB462', '#E67E22', '#95A5A6', '#34495E', '#2C3E50'];

                      return fundBreakdown.map((fund, index) => {
                        const startAngle = (cumulativePercentage * 360) / 100;
                        const endAngle = ((cumulativePercentage + fund.percentage) * 360) / 100;
                        cumulativePercentage += fund.percentage;

                        const largeArcFlag = fund.percentage > 50 ? 1 : 0;

                        const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
                        const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
                        const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
                        const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);

                        const pathData = [
                          `M ${centerX} ${centerY}`,
                          `L ${x1} ${y1}`,
                          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                          'Z'
                        ].join(' ');

                        return (
                          <path
                            key={fund.id}
                            d={pathData}
                            fill={colors[index % colors.length]}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        );
                      });
                    })()}
                    {/* Center circle */}
                    <circle cx="100" cy="100" r="50" fill="white" />
                    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                      ${(totalEndowment / 1000000).toFixed(1)}M
                    </text>
                  </svg>

                  {/* Legend */}
                  <div className="mt-6 space-y-2">
                    {fundBreakdown.map((fund, index) => {
                      const colors = ['#4A90A4', '#67B3CC', '#FDB462', '#E67E22', '#95A5A6'];
                      return (
                        <div key={fund.id} className="flex items-center text-sm">
                          <div className={`w-3 h-3 rounded mr-2`} style={{ backgroundColor: colors[index % colors.length] }} />
                          <span className="flex-1 text-gray-700">{fund.name}</span>
                          <span className="font-medium">{fund.percentage.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart Card */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Average Annual Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Y-axis labels */}
                  <div className="flex items-end justify-between h-64">
                    <div className="flex flex-col justify-between text-xs text-gray-500 mr-2 h-full">
                      <span>8%</span>
                      <span>6%</span>
                      <span>4%</span>
                      <span>2%</span>
                      <span>0%</span>
                    </div>

                    {/* Bars */}
                    <div className="flex-1 flex items-end justify-between gap-4 h-full">
                      {growthData.map((item) => {
                        const height = (item.value / 8) * 100;
                        return (
                          <div key={item.year} className="flex-1 flex flex-col items-center justify-end h-full">
                            <div
                              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer rounded-t"
                              style={{ height: `${height}%` }}
                              title={`${item.value}%`}
                            />
                            <span className="text-xs text-gray-600 mt-2">{item.year}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Endowments Table */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Search endowments here</CardTitle>
                <div className="text-sm text-gray-500">
                  Click on a row to see more information on that endowment
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="mb-4 flex gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by endowment name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSortConfig(null);
                  }}
                >
                  Reset
                </Button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-1 font-semibold text-sm hover:text-blue-600"
                        >
                          Endowment
                          {sortConfig?.key === 'name' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      </th>
                      <th className="text-right py-3 px-4">
                        <button
                          onClick={() => handleSort('estimatedAUM')}
                          className="flex items-center gap-1 font-semibold text-sm hover:text-blue-600 ml-auto"
                        >
                          Estimated AUM
                          {sortConfig?.key === 'estimatedAUM' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">1-year Investment<br/>return</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Previous FY<br/>return</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">3-year</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">5-year</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">10-year</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">20-year</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedFunds.map((fund) => (
                      <>
                        <tr
                          key={fund.id}
                          className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => toggleRowExpansion(fund.id)}
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{fund.name}</div>
                          </td>
                          <td className="text-right py-4 px-4 font-semibold">
                            ${(fund.estimatedAUM / 1000000).toFixed(1)}M
                          </td>
                          <td className="text-right py-4 px-4">
                            {fund.oneYearReturn ? `${fund.oneYearReturn}%` : '-'}
                          </td>
                          <td className="text-right py-4 px-4">
                            {fund.previousFYReturn ? `${fund.previousFYReturn}%` : '-'}
                          </td>
                          <td className="text-right py-4 px-4">
                            {fund.threeYearReturn ? `${fund.threeYearReturn}%` : '-'}
                          </td>
                          <td className="text-right py-4 px-4">
                            {fund.fiveYearReturn ? `${fund.fiveYearReturn}%` : '-'}
                          </td>
                          <td className="text-right py-4 px-4">
                            {fund.tenYearReturn ? `${fund.tenYearReturn}%` : '-'}
                          </td>
                          <td className="text-right py-4 px-4">
                            {fund.twentyYearReturn ? `${fund.twentyYearReturn}%` : '-'}
                          </td>
                          <td className="py-4 px-4">
                            {expandedRows.includes(fund.id) ?
                              <ChevronUp className="h-4 w-4" /> :
                              <ChevronDown className="h-4 w-4" />
                            }
                          </td>
                        </tr>
                        {expandedRows.includes(fund.id) && (
                          <tr key={`${fund.id}-details`}>
                            <td colSpan={9} className="bg-gray-50 px-8 py-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Fund Details</h4>
                                  <p className="text-gray-600 text-sm">
                                    This endowment supports {fund.category === 'primary' ? 'general operations and scholarships' :
                                    fund.category === 'youth' ? 'youth programs and summer camps' :
                                    fund.category === 'equipment' ? 'equipment purchases and maintenance' :
                                    fund.category === 'coaching' ? 'coach training and development' :
                                    'community outreach initiatives'}. The fund has shown consistent returns over the past decade,
                                    enabling us to expand our programs and reach more young athletes.
                                  </p>
                                </div>
                                <div className="grid grid-cols-4 gap-6">
                                  <div>
                                    <span className="text-sm text-gray-500">Fund Category</span>
                                    <p className="font-semibold capitalize">{fund.category}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Beneficiaries</span>
                                    <p className="font-semibold">{Math.floor(fund.estimatedAUM / 500000)} Athletes/Year</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Established</span>
                                    <p className="font-semibold">{2024 - Math.floor(Math.random() * 10)}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-500">Next Distribution</span>
                                    <p className="font-semibold">Q2 2025</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scholarship Athletes Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Scholarship Athletes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the talented young fencers whose dedication and passion inspire our mission
            </p>
          </div>

          {athletesLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading scholarship athletes...</p>
            </div>
          ) : scholarshipAthletes.length === 0 ? (
            <div className="text-center py-12">
              <Card className="inline-block max-w-md">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No scholarship athletes to display yet. Add athletes through the admin panel.
                  </p>
                  <Link href="/admin">
                    <Button variant="outline">
                      Go to Admin Panel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
                {scholarshipAthletes.slice(0, 2).map((athlete) => {
              // Try to find an image for this athlete
              const athleteImage = scholarshipImages.find(img =>
                img.altText?.toLowerCase().includes(athlete.name.toLowerCase())
              );
              const imageUrl = athleteImage ? getMediaUrl(athleteImage.filePath) : athlete.imageUrl;

              return (
                <Card
                  key={athlete.id}
                  className="hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedAthlete(athlete)}
                >
                  <div className="aspect-square relative bg-gradient-to-br from-primary/10 to-purple-600/10">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={athlete.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="h-20 w-20 text-muted-foreground/30" />
                      </div>
                    )}
                    {athlete.scholarshipYear && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-white">
                          {athlete.scholarshipYear}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{athlete.name}</h3>
                    {athlete.school && (
                      <p className="text-sm text-muted-foreground mb-2">{athlete.school}</p>
                    )}
                    {athlete.achievements && athlete.achievements.length > 0 && (
                      <div className="flex items-center text-sm text-primary">
                        <Trophy className="h-4 w-4 mr-1" />
                        <span>{athlete.achievements[0]}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add More Athletes CTA */}
          <div className="text-center">
            <Card className="inline-block">
              <CardContent className="p-8">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  To manage scholarship athletes, use the admin panel
                </p>
                <Link href="/admin">
                  <Button variant="outline">
                    Go to Admin Panel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
          )}
        </div>
      </section>

      {/* Athlete Detail Modal */}
      {selectedAthlete && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAthlete(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{selectedAthlete.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedAthlete.school}</p>
                </div>
                <Badge className="bg-yellow-500 text-white">
                  {selectedAthlete.scholarshipYear} Scholar
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-muted-foreground">{selectedAthlete.bio}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Achievements</h4>
                <div className="space-y-2">
                  {selectedAthlete.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => setSelectedAthlete(null)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Why It Matters Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-purple-600/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why Your Support Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <School className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Breaking Barriers</h3>
                <p className="text-sm text-muted-foreground">
                  Making elite sport accessible to all, regardless of economic background
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Long-term Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Building confidence, discipline, and leadership for life success
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Community Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Creating a sustainable model for youth sports accessibility
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <blockquote className="text-lg italic text-muted-foreground mb-4">
              "The scholarship changed my life. I never thought I'd be able to afford fencing,
              but now I'm competing at the state level and have made friends for life."
            </blockquote>
            <p className="font-semibold">- Scholarship Recipient, 2023</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Help Us Reach Our Goal
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Every contribution brings us closer to making fencing accessible for all youth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" variant="secondary">
                <DollarSign className="h-5 w-5 mr-2" />
                Make a Donation
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                <Users className="h-5 w-5 mr-2" />
                Become a Sponsor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}