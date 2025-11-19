import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import GearCard from "@/components/gear-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { MarketplaceItem } from "@shared/schema";
import { useMedia, getImagesByCategory, getMediaUrl } from "@/hooks/useMedia";
import { Search, Plus } from "lucide-react";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");

  const { data: items = [], isLoading } = useQuery<MarketplaceItem[]>({
    queryKey: ["/api/marketplace/items", { search, category, condition }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "all") params.append("category", category);
      if (condition && condition !== "all") params.append("condition", condition);
      
      const response = await fetch(`/api/marketplace/items?${params}`);
      if (!response.ok) throw new Error("Failed to fetch items");
      return response.json();
    },
  });

  const { data: mediaFiles = [] } = useMedia();
  const equipmentImages = getImagesByCategory(mediaFiles, 'equipment');

  const handleSearch = () => {
    // Search is automatically triggered by the query key change
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Equipment <span className="text-primary">Sharing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help make fencing accessible to everyone. Donate equipment you no longer need or find gear to support your journey in the sport.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Every Piece of Equipment Matters
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Your donated equipment directly supports underprivileged students in accessing high-quality fencing gear. 
              From masks to weapons, every contribution helps break down barriers and creates opportunities for young fencers.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search equipment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:col-span-1"
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="masks">Masks</SelectItem>
                  <SelectItem value="jackets">Jackets</SelectItem>
                  <SelectItem value="gloves">Gloves</SelectItem>
                  <SelectItem value="weapons">Weapons</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                </SelectContent>
              </Select>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="All Conditions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Donate Your Equipment
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Search className="h-4 w-4 mr-2" />
              Request Specific Equipment
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{items.length}</span> items available
          </div>
        </div>

        {/* Equipment Showcase */}
        {equipmentImages.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Equipment Gallery</h2>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/gallery'}>
                View All Photos
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {equipmentImages.slice(0, 4).map((image) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={getMediaUrl(image.filePath, image.filename)}
                    alt={image.altText || image.originalName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marketplace Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              No equipment found matching your criteria.
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Be the first to donate equipment
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <GearCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
