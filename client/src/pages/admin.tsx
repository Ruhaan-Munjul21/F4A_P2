import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Image, Video, Trash2, FileText, Users, Package, MessageSquare, Home, Eye, Clipboard, MousePointer, Crop, Edit, Trophy } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import ImageCropper from "@/components/image-cropper";
import MediaGalleryAdmin from "@/components/media-gallery-admin";
import GalleryPositionManager from "@/components/gallery-position-manager";
import ScholarshipAthletesAdmin from "@/components/scholarship-athletes-admin";

interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  uploadedBy?: string;
  altText?: string;
  category: string;
  isPublic: boolean;
  createdAt: string;
}

interface AdminStats {
  totalMarketplaceItems: number;
  totalRegistrations: number;
  totalDropoffs: number;
  totalPickups: number;
  totalContacts: number;
  totalDonations: number;
  totalMediaFiles: number;
  recentActivity: {
    marketplaceItems: any[];
    registrations: any[];
    mediaFiles: MediaFile[];
  };
}

export default function AdminPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState("programs-hero"); // Default to programs-hero for easier testing
  const [altText, setAltText] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Debug state changes
  useEffect(() => {
    console.log('State updated:', {
      selectedFile: selectedFile?.name,
      imagePreview: imagePreview ? 'set' : 'null',
      croppedFile: croppedFile?.name
    });
  }, [selectedFile, imagePreview, croppedFile]);

  // Fetch admin stats
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/dashboard");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  // Fetch media files
  const { data: mediaFiles, isLoading: mediaLoading } = useQuery<MediaFile[]>({
    queryKey: ["admin-media"],
    queryFn: async () => {
      const response = await fetch("/api/admin/media");
      if (!response.ok) throw new Error("Failed to fetch media");
      return response.json();
    },
  });

  // Upload media mutation
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["media"] }); // Also invalidate the public media query
      setSelectedFile(null);
      setAltText("");
      setImagePreview(null);
      setCroppedFile(null);
      toast({
        title: "Success!",
        description: `File uploaded successfully to category: ${uploadCategory}`,
      });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete media mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed, files:', event.target.files);
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, 'Type:', file.type, 'Size:', file.size);
      processFile(file);
    } else {
      console.log('No file selected');
    }
  };

  const processFile = (file: File) => {
    console.log('Processing file:', file);
    
    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      console.error('Invalid file type:', file.type);
      toast({
        title: "Invalid file type",
        description: "Please select an image or video file",
        variant: "destructive",
      });
      return;
    }

    console.log('File is valid, setting state');
    setSelectedFile(file);
    setAltText(file.name);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle paste event
  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
          toast({
            title: "Image pasted!",
            description: "Image from clipboard ready to upload",
          });
        }
      }
    }
  };

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      processFile(files[0]);
      toast({
        title: "File dropped!",
        description: "File ready to upload",
      });
    }
  };

  const handleUpload = () => {
    const fileToUpload = croppedFile || selectedFile;
    if (!fileToUpload) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    console.log('Uploading file:', fileToUpload.name, 'Type:', fileToUpload.type, 'Size:', fileToUpload.size);

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("category", uploadCategory);
    formData.append("altText", altText);
    formData.append("uploadedBy", "admin");
    formData.append("isPublic", "true");

    uploadMutation.mutate(formData);
  };

  const handleCrop = (croppedBlob: Blob) => {
    // Convert blob to file
    const file = new File([croppedBlob], selectedFile?.name || 'cropped-image.jpg', {
      type: 'image/jpeg'
    });
    
    setCroppedFile(file);
    
    // Update preview with cropped image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setShowCropper(false);
    toast({
      title: "Image cropped!",
      description: "Your image has been cropped and is ready to upload",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileUrl = (filePath: string) => {
    // If it's already a full URL (Firebase), return as is
    if (filePath.startsWith('http')) {
      return filePath;
    }
    // Otherwise, try to construct a local URL
    return filePath;
  };

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading admin dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Image Cropper Modal */}
      {showCropper && imagePreview && (
        <ImageCropper
          imageUrl={imagePreview}
          onCrop={handleCrop}
          onCancel={() => setShowCropper(false)}
          aspectRatio={(() => {
            // Different aspect ratios for different categories
            switch(uploadCategory) {
              case 'hero':
              case 'programs-hero':
              case 'about-hero':
                return 16/9; // Wide banner format
              case 'youth-classes':
              case 'summer-camps':
              case 'competition-team':
                return 16/10; // Slightly wider for program cards
              case 'gallery':
              case 'students':
              case 'instructors':
                return 4/3; // Standard photo format
              case 'equipment':
              case 'testimonials':
                return 1; // Square format
              default:
                return 16/9; // Default to wide format
            }
          })()}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your site content and media</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/editor">
              <Button variant="default">
                <Edit className="h-4 w-4 mr-2" />
                Page Editor
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
          </div>
        </div>

      {/* New Page Editor Notice */}
      <Alert className="mb-6 border-purple-200 bg-purple-50">
        <AlertDescription>
          <strong>🎉 New Feature: Page-by-Page Editor!</strong>
          <p className="mt-2 text-sm">
            Click the <strong>"Page Editor"</strong> button above to access the new visual editor where you can:
          </p>
          <ul className="mt-2 ml-4 text-sm space-y-1">
            <li>• Edit content for every page of your site</li>
            <li>• Change images and videos in each section</li>
            <li>• Update text, stats, and call-to-action buttons</li>
            <li>• Preview changes in real-time</li>
            <li>• Manage photo galleries and team members</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="gallery-positions">Gallery Setup</TabsTrigger>
          <TabsTrigger value="athletes">Athletes</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Marketplace Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalMarketplaceItems || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalRegistrations || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalContacts || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalMediaFiles || 0}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Media Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentActivity.mediaFiles?.slice(0, 5).map((file) => (
                    <div key={file.id} className="flex items-center space-x-3">
                      {file.mimeType.startsWith('image/') ? (
                        <Image className="h-4 w-4" />
                      ) : (
                        <Video className="h-4 w-4" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.originalName}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.fileSize)}</p>
                      </div>
                      <Badge variant="secondary">{file.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Marketplace Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentActivity.marketplaceItems?.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Package className="h-4 w-4" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <Badge variant={item.isAvailable ? "default" : "secondary"}>
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>All uploaded images and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <MediaGalleryAdmin 
                category="all"
                showFilters={true}
                columns={4}
                allowDelete={true}
                singleImageMode={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6" onPaste={handlePaste}>
          {/* Quick Guide */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-sm">
              <strong>Quick Tips:</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• <strong>Paste images:</strong> Copy an image and press Ctrl/Cmd+V anywhere on this page</li>
                <li>• <strong>Drag & Drop:</strong> Drag files directly into the upload area below</li>
                <li>• For homepage hero section: Select "Hero Section (Homepage)" category</li>
                <li>• <strong className="text-yellow-600">Recommended image size: 1920x1080 pixels or larger for best quality</strong></li>
                <li>• <strong className="text-yellow-600">For hero images: Use high-resolution images (2MB+) to avoid blurriness</strong></li>
                <li>• <strong>Supported formats:</strong>
                  <ul className="ml-4 mt-1">
                    <li>Images: JPG, PNG, WebP, GIF</li>
                    <li>Videos: MP4, WebM, MOV, AVI</li>
                    <li>Audio: MP3, WAV, OGG, M4A</li>
                  </ul>
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
              <CardDescription>Upload, paste, or drag images and videos to your media library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-primary bg-primary/5 scale-102' 
                    : 'border-gray-300 hover:border-gray-400'
                } ${selectedFile ? 'bg-muted/30' : ''}`}
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      {selectedFile?.type.startsWith('image/') && (
                        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowCropper(true)}
                          >
                            <Crop className="h-4 w-4 mr-1" />
                            Crop Image
                          </Button>
                          <span className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                            {(() => {
                              switch(uploadCategory) {
                                case 'hero':
                                case 'programs-hero':
                                case 'about-hero':
                                  return '16:9 ratio';
                                case 'youth-classes':
                                case 'summer-camps':
                                case 'competition-team':
                                  return '16:10 ratio';
                                case 'gallery':
                                case 'students':
                                case 'instructors':
                                  return '4:3 ratio';
                                case 'equipment':
                                case 'testimonials':
                                  return '1:1 square';
                                default:
                                  return '16:9 ratio';
                              }
                            })()}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      {croppedFile ? '✓ Cropped: ' : ''}{selectedFile?.name}
                    </p>
                  </div>
                ) : selectedFile ? (
                  <div className="space-y-2">
                    <Video className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Video selected - {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-base font-medium">
                        Drop files here, paste with Ctrl/Cmd+V, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Support for images and videos
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="alt-text">Alt Text / Description</Label>
                    <Input
                      id="alt-text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Describe the image/video"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={uploadCategory} onValueChange={setUploadCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hero">Hero Section (Homepage)</SelectItem>
                        <SelectItem value="intro-video">Intro Video (Homepage)</SelectItem>
                        <SelectItem value="video-poster">Video Poster/Cover Image</SelectItem>
                        <SelectItem value="gallery">Photo Gallery</SelectItem>
                        <SelectItem value="events">Events & Activities</SelectItem>
                        <SelectItem value="students">Student Photos</SelectItem>
                        <SelectItem value="instructors">Instructors & Staff</SelectItem>
                        <SelectItem value="equipment">Equipment & Gear</SelectItem>
                        <SelectItem value="testimonials">Testimonials</SelectItem>
                        <SelectItem value="programs-hero">Programs Page Hero</SelectItem>
                        <SelectItem value="youth-classes">Youth Classes Program</SelectItem>
                        <SelectItem value="summer-camps">Summer Camps Program</SelectItem>
                        <SelectItem value="competition-team">Competition Team Program</SelectItem>
                        <SelectItem value="about-hero">About Page Hero</SelectItem>
                        <SelectItem value="why-we-started">Why We Started Section</SelectItem>
                        <SelectItem value="goals">Goals Section</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpload}
                      disabled={uploadMutation.isPending}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadMutation.isPending ? "Uploading..." : "Upload File"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview(null);
                        setAltText("");
                        setCroppedFile(null);
                      }}
                      disabled={uploadMutation.isPending}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}

              {uploadMutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Upload failed. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              {uploadMutation.isSuccess && (
                <Alert>
                  <AlertDescription>
                    File uploaded successfully!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery-positions" className="space-y-6">
          <GalleryPositionManager />
        </TabsContent>

        <TabsContent value="athletes" className="space-y-6">
          <ScholarshipAthletesAdmin />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage site content and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Content management features coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
      <Footer />
    </div>
  );
}