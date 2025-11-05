import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Image as ImageIcon, Calendar, User } from "lucide-react";
import { useMedia, getMediaUrl, MediaFile } from "@/hooks/useMedia";

interface MediaGalleryProps {
  category?: string;
  limit?: number;
  showFilters?: boolean;
  columns?: number;
}

export default function MediaGallery({ 
  category = "gallery", 
  limit,
  showFilters = true,
  columns = 3
}: MediaGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [mediaType, setMediaType] = useState<"all" | "image" | "video">("all");
  
  const { data: allMedia = [], isLoading } = useMedia({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    type: mediaType === "all" ? undefined : mediaType
  });

  const displayMedia = limit ? allMedia.slice(0, limit) : allMedia;

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "gallery", label: "Gallery" },
    { value: "hero", label: "Hero Images" },
    { value: "equipment", label: "Equipment" },
    { value: "events", label: "Events" },
    { value: "testimonials", label: "Testimonials" }
  ];

  const MediaItem = ({ file }: { file: MediaFile }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative aspect-video bg-gray-100">
              {file.mimeType.startsWith('image/') ? (
                imageError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Image unavailable</span>
                  </div>
                ) : (
                  <img
                    src={getMediaUrl(file.filePath, file.filename)}
                    alt={file.altText || file.originalName}
                    className="w-full h-full object-cover"
                    onError={() => {
                      console.error(`Failed to load image: ${file.filePath}`);
                      setImageError(true);
                    }}
                    loading="lazy"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20">
                  <Play className="w-12 h-12 text-white" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {file.mimeType.startsWith('image/') ? <ImageIcon className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Badge>
              </div>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full">
          <div className="space-y-4">
            {file.mimeType.startsWith('image/') ? (
              <img
                src={getMediaUrl(file.filePath, file.filename)}
                alt={file.altText || file.originalName}
                className="w-full max-h-[70vh] object-contain"
              />
            ) : (
              <video
                src={getMediaUrl(file.filePath, file.filename)}
                controls
                className="w-full max-h-[70vh]"
              >
                Your browser does not support the video tag.
              </video>
            )}
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{file.originalName}</h2>
              {file.altText && (
                <p className="text-muted-foreground">{file.altText}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(file.createdAt).toLocaleDateString()}
                </span>
                {file.uploadedBy && (
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {file.uploadedBy}
                  </span>
                )}
                <Badge variant="outline">{file.category}</Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

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
      {showFilters && (
        <div className="flex justify-center">
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

      {displayMedia.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No media files found for this category.</p>
            <p className="text-sm mt-1">Upload some files in the admin panel to get started!</p>
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
          {displayMedia.map((file) => (
            <MediaItem key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}