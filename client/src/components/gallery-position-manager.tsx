import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { useMedia, getMediaUrl, MediaFile } from "@/hooks/useMedia";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Save, Image as ImageIcon } from "lucide-react";

const GALLERY_POSITIONS = [
  { id: "youth-program", label: "Youth Fencing Program (Main - Large)" },
  { id: "quality-equipment", label: "Quality Equipment" },
  { id: "competition-ready", label: "Competition Ready" },
  { id: "community-events", label: "Community Events" },
  { id: "personal-coaching", label: "Personal Coaching" },
  { id: "celebrating-success", label: "Celebrating Success" }
];

export default function GalleryPositionManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [positions, setPositions] = useState<Record<string, number>>({});

  // Get all gallery images
  const { data: allMedia = [], isLoading } = useMedia();
  const galleryImages = allMedia.filter(m =>
    m.mimeType.startsWith('image/') &&
    (m.category === 'gallery' || m.category === 'homepage-gallery')
  );

  // Update metadata mutation
  const updateMetadataMutation = useMutation({
    mutationFn: async ({ id, metadata }: { id: number; metadata: any }) => {
      const response = await fetch(`/api/admin/media/${id}/metadata`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata }),
      });
      if (!response.ok) throw new Error("Failed to update metadata");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast({
        title: "Success",
        description: "Gallery positions updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update gallery positions",
        variant: "destructive",
      });
    }
  });

  const handlePositionChange = (positionId: string, imageId: string) => {
    const numericId = parseInt(imageId);
    if (isNaN(numericId)) return;

    setPositions(prev => ({
      ...prev,
      [positionId]: numericId
    }));
  };

  const handleSavePositions = async () => {
    // Clear all existing position metadata first
    for (const image of galleryImages) {
      if (image.metadata?.position) {
        await updateMetadataMutation.mutateAsync({
          id: image.id,
          metadata: { ...image.metadata, position: null }
        });
      }
    }

    // Set new positions
    for (const [positionId, imageId] of Object.entries(positions)) {
      const image = galleryImages.find(img => img.id === imageId);
      if (image) {
        await updateMetadataMutation.mutateAsync({
          id: imageId,
          metadata: { ...image.metadata, position: positionId }
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading images...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Homepage Gallery Position Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Assign specific images to each position in the homepage gallery.
            Upload images with category "gallery" or "homepage-gallery" first.
          </p>

          {galleryImages.length === 0 ? (
            <Alert>
              <AlertDescription>
                No gallery images found. Upload images with category "gallery" or "homepage-gallery" to assign positions.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GALLERY_POSITIONS.map(position => {
                  const currentImage = galleryImages.find(img =>
                    img.metadata?.position === position.id
                  ) || galleryImages.find(img => img.id === positions[position.id]);

                  return (
                    <div key={position.id} className="space-y-2">
                      <Label className="text-sm font-medium">{position.label}</Label>
                      <div className="flex gap-2">
                        <Select
                          value={positions[position.id]?.toString() || ""}
                          onValueChange={(value) => handlePositionChange(position.id, value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select an image" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {galleryImages.map(image => (
                              <SelectItem key={image.id} value={image.id.toString()}>
                                {image.originalName} ({image.category})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {currentImage && (
                        <div className="mt-2">
                          <img
                            src={getMediaUrl(currentImage.filePath)}
                            alt={currentImage.altText || ""}
                            className="w-full h-24 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSavePositions}
                  disabled={updateMetadataMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Gallery Positions
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}