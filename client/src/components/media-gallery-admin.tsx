import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Image as ImageIcon, Calendar, User, Trash2, Star, Eye, MapPin } from "lucide-react";
import { useMedia, getMediaUrl, MediaFile } from "@/hooks/useMedia";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface MediaGalleryAdminProps {
  category?: string;
  limit?: number;
  showFilters?: boolean;
  columns?: number;
  allowDelete?: boolean;
  singleImageMode?: boolean; // For hero section - only show one image
}

export default function MediaGalleryAdmin({ 
  category = "gallery", 
  limit,
  showFilters = true,
  columns = 3,
  allowDelete = true,
  singleImageMode = false
}: MediaGalleryAdminProps) {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [mediaType, setMediaType] = useState<"all" | "image" | "video">("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: allMedia = [], isLoading } = useMedia({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    type: mediaType === "all" ? undefined : mediaType
  });

  // Sort by creation date (newest first)
  const sortedMedia = [...allMedia].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // In single image mode (for hero), only show the most recent image
  const displayMedia = singleImageMode 
    ? sortedMedia.slice(0, 1)
    : (limit ? sortedMedia.slice(0, limit) : sortedMedia);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast({
        title: "Media Deleted",
        description: "The media file has been removed successfully",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error instanceof Error ? error.message : "Failed to delete media",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "gallery", label: "Gallery" },
    { value: "hero", label: "Hero Images" },
    { value: "equipment", label: "Equipment" },
    { value: "events", label: "Events" },
    { value: "testimonials", label: "Testimonials" }
  ];

  const MediaItem = ({ file, isActive }: { file: MediaFile; isActive?: boolean }) => (
    <Card className={`overflow-hidden ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative aspect-video bg-gray-100">
        {file.mimeType.startsWith('image/') ? (
          <img
            src={getMediaUrl(file.filePath, file.filename)}
            alt={file.altText || file.originalName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20">
            <Play className="w-12 h-12 text-white" />
          </div>
        )}
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isActive && (
            <Badge variant="default" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            {file.mimeType.startsWith('image/') ? <ImageIcon className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Badge>
        </div>

        {/* Action buttons */}
        {allowDelete && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                  <Eye className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{file.originalName}</DialogTitle>
                </DialogHeader>
                {file.mimeType.startsWith('image/') ? (
                  <img
                    src={getMediaUrl(file.filePath, file.filename)}
                    alt={file.altText || file.originalName}
                    className="w-full max-h-[60vh] object-contain"
                  />
                ) : (
                  <video
                    src={getMediaUrl(file.filePath, file.filename)}
                    controls
                    className="w-full max-h-[60vh]"
                  />
                )}
              </DialogContent>
            </Dialog>

            <AlertDialog open={deleteId === file.id} onOpenChange={(open) => !open && setDeleteId(null)}>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setDeleteId(file.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Media File?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{file.originalName}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(file.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium text-sm truncate mb-1">{file.originalName}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(file.createdAt).toLocaleDateString()}
          </span>
          <Badge variant="outline" className="text-xs">{file.category}</Badge>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading media...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showFilters && !singleImageMode && (
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            {["all", "image", "video"].map((type) => (
              <Button
                key={type}
                variant={mediaType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setMediaType(type as any)}
              >
                {type === "all" ? "All Media" : type === "image" ? "Images" : "Videos"}
              </Button>
            ))}
          </div>
        </div>
      )}

      {singleImageMode && displayMedia.length > 0 && sortedMedia.length > 1 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Only the most recent image is shown as the active hero image. 
            {sortedMedia.length - 1} older {sortedMedia.length - 1 === 1 ? 'image is' : 'images are'} hidden.
          </p>
        </div>
      )}

      {displayMedia.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No media files found for this category.</p>
            <p className="text-sm mt-1">Upload a file to get started!</p>
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${!singleImageMode && `md:grid-cols-${Math.min(columns, 4)}`} gap-6`}>
          {displayMedia.map((file, index) => (
            <MediaItem 
              key={file.id} 
              file={file} 
              isActive={singleImageMode && index === 0}
            />
          ))}
        </div>
      )}

      {/* Show count of hidden items in single image mode */}
      {singleImageMode && sortedMedia.length > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          <button
            onClick={() => {
              // Could implement a modal to show all images
              toast({
                title: "Older Hero Images",
                description: `There are ${sortedMedia.length - 1} older hero images. Delete them from the media library if not needed.`,
              });
            }}
            className="hover:underline"
          >
            View {sortedMedia.length - 1} older {sortedMedia.length - 1 === 1 ? 'image' : 'images'}
          </button>
        </div>
      )}
    </div>
  );
}