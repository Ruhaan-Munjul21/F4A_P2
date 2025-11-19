import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X, Image as ImageIcon, Video, Music, Loader2, Crop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface MediaUploadProps {
  category?: string;
  onUploadSuccess?: (data: any) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export default function MediaUpload({
  category = "general",
  onUploadSuccess,
  accept = "image/*,video/*,audio/*",
  maxSize = 200
}: MediaUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [crop, setCrop] = useState<CropType>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }
    };
  }, [croppedImageUrl]);

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      
      // Clear form
      setSelectedFile(null);
      setPreview(null);
      setAltText("");
      setCroppedFile(null);
      setCroppedImageUrl(null);
      setCrop(undefined);
      
      // Clean up object URLs to prevent memory leaks
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }
      
      toast({
        title: "Success!",
        description: "File uploaded successfully",
      });
      
      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (file: File) => {
    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const isAudio = file.type.startsWith('audio/');
    
    if (!isImage && !isVideo && !isAudio) {
      toast({
        title: "Invalid file type",
        description: "Please select an image, video, or audio file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setCroppedFile(null);
    setCroppedImageUrl(null);
    
    // Create preview for images
    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        // Show crop dialog for images
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setShowCropDialog(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = () => {
    // Use cropped file if available, otherwise use original
    const fileToUpload = croppedFile || selectedFile;
    
    if (!fileToUpload) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("category", category);
    formData.append("altText", altText || fileToUpload.name);
    formData.append("uploadedBy", "admin");
    formData.append("isPublic", "true");

    uploadMutation.mutate(formData);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    // For 'why-we-started', don't force aspect ratio
    if (category === 'why-we-started') {
      // Just center a selection without forcing aspect ratio
      const crop: CropType = {
        unit: '%',
        x: 5,
        y: 5,
        width: 90,
        height: 90
      };
      setCrop(crop);
    } else {
      // For other categories, use 16:9 aspect ratio
      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          16 / 9,
          width,
          height
        ),
        width,
        height
      );
      setCrop(crop);
    }
  };

  const getCroppedImg = async (): Promise<void> => {
    if (!imgRef.current || !crop || !preview) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast({
            title: "Crop failed",
            description: "Failed to create cropped image",
            variant: "destructive",
          });
          return;
        }

        // Keep original extension if it's a supported format, otherwise use .jpg
        const originalExt = selectedFile?.name.split('.').pop()?.toLowerCase();
        const supportedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        const ext = supportedExts.includes(originalExt || '') ? originalExt : 'jpg';
        
        // Create a new File from the blob with proper name
        const nameWithoutExt = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image';
        const croppedFileName = `${nameWithoutExt}_cropped.${ext}`;
        
        const croppedFileObj = new File([blob], croppedFileName, {
          type: blob.type || 'image/jpeg',
          lastModified: Date.now(),
        });

        // Clean up previous cropped image URL if exists
        if (croppedImageUrl) {
          URL.revokeObjectURL(croppedImageUrl);
        }

        // Create URL for preview
        const croppedUrl = URL.createObjectURL(blob);
        setCroppedImageUrl(croppedUrl);
        setCroppedFile(croppedFileObj);
        setShowCropDialog(false);
        
        toast({
          title: "Image cropped",
          description: "Your image has been cropped successfully",
        });
      },
      'image/jpeg',
      0.95
    );
  };

  const handleCancelCrop = () => {
    setShowCropDialog(false);
    // Keep the original file selected, clear any cropped version
    setCroppedFile(null);
    setCroppedImageUrl(null);
    setCrop(undefined);
  };

  const handleApplyCrop = () => {
    getCroppedImg();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Crop Dialog */}
      {showCropDialog && preview && selectedFile?.type.startsWith('image/') && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Crop Image</h2>
                <p className="text-sm text-muted-foreground">
                  Select the area you want to keep. You can adjust the crop area by dragging.
                </p>
              </div>

              <div className="flex justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  aspect={category === 'why-we-started' ? undefined : 16 / 9}
                  minWidth={100}
                  minHeight={category === 'why-we-started' ? 100 : 56}
                >
                  <img
                    ref={imgRef}
                    src={preview}
                    alt="Crop preview"
                    onLoad={onImageLoad}
                    style={{ maxHeight: '500px', width: 'auto' }}
                  />
                </ReactCrop>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {category === 'why-we-started'
                    ? 'Free crop - adjust to your preference'
                    : 'Aspect ratio: 16:9 (recommended for hero images)'}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancelCrop}>
                    Skip Cropping
                  </Button>
                  <Button onClick={handleApplyCrop}>
                    <Crop className="h-4 w-4 mr-1" />
                    Apply Crop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        } ${selectedFile ? "bg-gray-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="space-y-4">
            {(croppedImageUrl || preview) && (
              <div className="relative">
                <img
                  src={croppedImageUrl || preview || ''}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                />
                {croppedImageUrl && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Cropped
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-center gap-2">
              {selectedFile.type.startsWith('image/') ? (
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              ) : selectedFile.type.startsWith('video/') ? (
                <Video className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Music className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-sm text-muted-foreground">
                ({formatFileSize(selectedFile.size)})
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                  setCroppedFile(null);
                  setCroppedImageUrl(null);
                  setCrop(undefined);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
              <p className="text-sm text-muted-foreground">
                or drag and drop your file here
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {maxSize}MB • Images, Videos, Audio (MP3, WAV, etc.)
              </p>
            </div>
          </>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
      </div>

      {/* Re-crop Button for Images */}
      {selectedFile && selectedFile.type.startsWith('image/') && !showCropDialog && (
        <Button
          variant="outline"
          onClick={() => setShowCropDialog(true)}
          className="w-full"
        >
          <Crop className="h-4 w-4 mr-2" />
          {croppedImageUrl ? 'Adjust Crop' : 'Crop Image'}
        </Button>
      )}

      {/* Alt Text Input */}
      {selectedFile && (
        <div>
          <Label>Alt Text / Description</Label>
          <Input
            placeholder="Describe this media for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <Button
          onClick={handleUpload}
          disabled={uploadMutation.isPending}
          className="w-full"
        >
          {uploadMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </>
          )}
        </Button>
      )}

      {/* Error Display */}
      {uploadMutation.isError && (
        <Alert variant="destructive">
          <AlertDescription>
            {uploadMutation.error instanceof Error 
              ? uploadMutation.error.message 
              : "Failed to upload file"}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}