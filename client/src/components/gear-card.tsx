import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { MarketplaceItem } from "@shared/schema";
import { UserCircle } from "lucide-react";

interface GearCardProps {
  item: MarketplaceItem;
}

export default function GearCard({ item }: GearCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const requestMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/equipment/requests", {
        itemId: item.id,
        message: `I would like to request the ${item.title}`,
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Sent!",
        description: "Your equipment request has been sent to the donor.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/equipment/requests/user"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please Log In",
          description: "You need to be logged in to request equipment.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Request Failed",
        description: "There was an error sending your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRequest = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please Log In",
        description: "You need to be logged in to request equipment.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    requestMutation.mutate();
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "bg-emerald-600";
      case "like new":
        return "bg-blue-600";
      case "good":
        return "bg-yellow-500";
      case "fair":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="marketplace-card bg-white hover:shadow-md transition-all duration-300">
      <div className="aspect-video bg-muted-foreground/10 rounded-t-lg overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-600/10">
            <span className="text-muted-foreground text-sm">
              {item.category} Image
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-foreground truncate pr-2">
            {item.title}
          </h3>
          <Badge
            className={`${getConditionColor(item.condition)} text-white text-xs px-2 py-1`}
          >
            {item.condition}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        
        {item.size && (
          <div className="text-xs text-muted-foreground mb-3">
            Size: {item.size}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <UserCircle className="h-4 w-4 mr-1" />
            <span>Donor</span>
          </div>
          <Button
            size="sm"
            onClick={handleRequest}
            disabled={requestMutation.isPending || !item.isAvailable}
            className="btn-hover-lift"
          >
            {requestMutation.isPending
              ? "Requesting..."
              : !item.isAvailable
              ? "Unavailable"
              : "Request"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
