import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import MediaUpload from "@/components/media-upload";
import MediaGallery from "@/components/media-gallery";
import MediaGalleryAdmin from "@/components/media-gallery-admin";
import {
  Home, Users, Heart, GraduationCap, Mail, Image as ImageIcon,
  Video, Edit, Save, X, Upload, Eye, Settings, FileText,
  Plus, Trash2, Move, Type, Palette, Layout, GripVertical
} from "lucide-react";

// Define editable sections for each page
const SITE_PAGES = {
  home: {
    name: "Homepage",
    icon: Home,
    sections: [
      { id: "home-hero", name: "Hero Section", type: "media", description: "Main banner with image/video background" },
      { id: "stats", name: "Impact Stats", type: "data", description: "Dynamic numbers (students, donations, etc.)" },
      { id: "intro-video", name: "Introduction Video", type: "video", description: "Featured video about the program" },
      { id: "mission", name: "Mission Section", type: "mission", description: "Our Mission: Breaking Barriers in Sport" },
      { id: "about", name: "About Section", type: "content", description: "Mission statement and description" },
      { id: "services", name: "Programs/Services", type: "cards", description: "Free programs offered" },
      { id: "gallery", name: "Photo Gallery", type: "gallery", description: "Community photos grid" },
      { id: "donation", name: "Donation Section", type: "content", description: "Support options and CTAs" }
    ]
  },
  about: {
    name: "About Us",
    icon: Users,
    sections: [
      { id: "about-hero", name: "Hero Section", type: "media", description: "About page hero image" },
      { id: "team", name: "Team Members", type: "team", description: "Leadership team and staff members" },
      { id: "goals", name: "Goals & Impact", type: "goals", description: "Impact statistics (editable in Admin)" },
      { id: "partners", name: "Our Partners", type: "team", description: "Partner organizations (use category: partners)" },
      { id: "why-we-started", name: "Why We Started", type: "why-we-started", description: "Origin story with mission, vision, values" },
      { id: "mission", name: "Mission Section", type: "about-mission", description: "Our mission with image" },
      { id: "advisors", name: "Board & Advisors", type: "team", description: "Board members and advisors" }
    ]
  },
  services: {
    name: "Services/Programs",
    icon: GraduationCap,
    sections: [
      { id: "services-hero", name: "Page Hero", type: "media", description: "Services page banner" },
      { id: "youth-classes", name: "Youth Classes", type: "content", description: "Youth program details" },
      { id: "summer-camps", name: "Summer Camps", type: "content", description: "Camp information" },
      { id: "competition", name: "Competition Training", type: "content", description: "Advanced training programs" },
      { id: "schedule", name: "Class Schedule", type: "data", description: "Weekly schedule grid" }
    ]
  },
  gallery: {
    name: "Photo Gallery",
    icon: ImageIcon,
    sections: [
      { id: "gallery-hero", name: "Page Hero", type: "media", description: "Gallery page banner" },
      { id: "photos", name: "Photo Grid", type: "gallery", description: "All gallery images" },
      { id: "videos", name: "Video Gallery", type: "gallery", description: "Featured videos" }
    ]
  },
  donate: {
    name: "Donate",
    icon: Heart,
    sections: [
      { id: "donate-hero", name: "Page Hero", type: "media", description: "Donate page banner" },
      { id: "donation-options", name: "Donation Options", type: "cards", description: "Different ways to donate" },
      { id: "impact", name: "Your Impact", type: "content", description: "How donations help" },
      { id: "sponsors", name: "Sponsors", type: "gallery", description: "Corporate sponsors logos" }
    ]
  },
  contact: {
    name: "Contact",
    icon: Mail,
    sections: [
      { id: "contact-hero", name: "Page Hero", type: "media", description: "Contact page banner" },
      { id: "contact-info", name: "Contact Information", type: "data", description: "Address, phone, email" },
      { id: "form", name: "Contact Form", type: "form", description: "Contact form fields" },
      { id: "map", name: "Location Map", type: "content", description: "Google Maps embed" }
    ]
  }
};

interface ContentItem {
  id: string;
  type: 'text' | 'image' | 'video' | 'data';
  content: any;
  metadata?: any;
}

interface MissionContent {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
  imageUrl?: string;
  badgeText: string;
  badgeSubtext: string;
}

interface TeamMember {
  id?: number;
  name: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category: string;
  ordering?: number;
  isActive?: boolean;
  linkedinUrl?: string;
  email?: string;
}

// Team Member Manager Component
function TeamMemberManager({ category, sectionName }: { category: string; sectionName: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [editUploadingImage, setEditUploadingImage] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<TeamMember | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [newMember, setNewMember] = useState<TeamMember>({
    name: '',
    title: '',
    description: '',
    category,
    ordering: 0,
    isActive: true,
  });

  // Fetch team members
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['admin-team-members'],
    queryFn: async () => {
      const response = await fetch('/api/admin/team-members');
      if (!response.ok) throw new Error('Failed to fetch team members');
      return response.json();
    },
  });

  const categoryMembers = teamMembers.filter((m: TeamMember) => m.category === category);
  const sortedMembers = [...categoryMembers].sort((a: TeamMember, b: TeamMember) =>
    (a.ordering || 0) - (b.ordering || 0)
  );

  // Handle image upload for new member
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'team-members');
    formData.append('altText', newMember.name || 'Team member photo');

    try {
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload response:', data); // Debug log

      if (response.ok && data.url) {
        setNewMember({ ...newMember, imageUrl: data.url });
        toast({ title: 'Success', description: 'Image uploaded successfully' });
      } else if (response.ok && data.media?.filePath) {
        // Fallback to media.filePath if url is not directly available
        setNewMember({ ...newMember, imageUrl: data.media.filePath });
        toast({ title: 'Success', description: 'Image uploaded successfully' });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle image upload for editing member
  const handleEditImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingMember) return;

    setEditUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'team-members');
    formData.append('altText', editingMember.name || 'Team member photo');

    try {
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Edit upload response:', data); // Debug log

      if (response.ok && data.url) {
        setEditingMember({ ...editingMember, imageUrl: data.url });
        toast({ title: 'Success', description: 'Image uploaded successfully' });
      } else if (response.ok && data.media?.filePath) {
        // Fallback to media.filePath if url is not directly available
        setEditingMember({ ...editingMember, imageUrl: data.media.filePath });
        toast({ title: 'Success', description: 'Image uploaded successfully' });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Edit upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setEditUploadingImage(false);
    }
  };

  // Create team member mutation
  const createMutation = useMutation({
    mutationFn: async (member: TeamMember) => {
      console.log('Creating team member:', member);
      const response = await fetch('/api/admin/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });

      const data = await response.json();
      console.log('Create response:', response.status, data);

      if (!response.ok) {
        // Show the actual error from the server
        const errorMessage = data.errors
          ? data.errors.map((e: any) => `${e.path}: ${e.message}`).join(', ')
          : data.message || 'Failed to create team member';
        throw new Error(errorMessage);
      }
      return data;
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Team member added successfully' });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] }); // Also invalidate public query
      // Set ordering for next member to be at the end
      const nextOrdering = sortedMembers.length > 0
        ? Math.max(...sortedMembers.map(m => m.ordering || 0)) + 1
        : 0;
      setNewMember({ name: '', title: '', description: '', category, ordering: nextOrdering, isActive: true });
    },
    onError: (error) => {
      console.error('Create mutation error:', error);
      toast({
        title: 'Failed to add team member',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    }
  });

  // Update team member mutation
  const updateMutation = useMutation({
    mutationFn: async (member: TeamMember) => {
      console.log('Updating team member:', member);
      const response = await fetch(`/api/admin/team-members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.errors
          ? data.errors.map((e: any) => `${e.path}: ${e.message}`).join(', ')
          : data.message || 'Failed to update team member';
        throw new Error(errorMessage);
      }
      return data;
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Team member updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] }); // Also invalidate public query
      setEditingMember(null);
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      toast({
        title: 'Failed to update team member',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    }
  });

  // Delete team member mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/team-members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete team member');
      }
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Team member deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] }); // Also invalidate public query
    },
    onError: (error) => {
      console.error('Delete mutation error:', error);
      toast({
        title: 'Failed to delete team member',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    }
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async (members: { id: number; ordering: number }[]) => {
      const response = await fetch('/api/admin/team-members/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members }),
      });
      if (!response.ok) throw new Error('Failed to reorder team members');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Order updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update order',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      });
    }
  });

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, member: TeamMember) => {
    setDraggedItem(member);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    const draggedIndex = sortedMembers.findIndex(m => m.id === draggedItem.id);
    if (draggedIndex === dropIndex) {
      handleDragEnd();
      return;
    }

    // Reorder the array
    const reorderedMembers = [...sortedMembers];
    reorderedMembers.splice(draggedIndex, 1);
    reorderedMembers.splice(dropIndex, 0, draggedItem);

    // Update ordering values
    const updates = reorderedMembers.map((member, index) => ({
      id: member.id!,
      ordering: index
    }));

    // Send update to server
    await reorderMutation.mutate(updates);

    handleDragEnd();
  };

  return (
    <div className="space-y-6">
      {/* Add New Member Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New {sectionName} Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="John Doe"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Executive Director"
                value={newMember.title}
                onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Brief description of role and experience..."
              value={newMember.description}
              onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Photo</Label>
              <div className="space-y-2">
                {newMember.imageUrl ? (
                  <div className="relative">
                    <img
                      src={newMember.imageUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1"
                      onClick={() => setNewMember({ ...newMember, imageUrl: undefined })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                    <label className="cursor-pointer text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                )}
                {uploadingImage && (
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                )}
              </div>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input
                type="number"
                placeholder="0"
                value={newMember.ordering}
                onChange={(e) => setNewMember({ ...newMember, ordering: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <Button
            onClick={() => {
              // Clean up the data before sending
              const memberData = {
                ...newMember,
                category: category,
                description: newMember.description || '',
                imageUrl: newMember.imageUrl || undefined,
                ordering: newMember.ordering || 0,
                isActive: newMember.isActive !== false
              };
              createMutation.mutate(memberData);
            }}
            disabled={!newMember.name || !newMember.title || createMutation.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            {createMutation.isPending ? 'Adding...' : 'Add Team Member'}
          </Button>
        </CardContent>
      </Card>

      {/* Current Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Current {sectionName}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading team members...</p>
          ) : sortedMembers.length === 0 ? (
            <p className="text-muted-foreground">No team members added yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Drag and drop to reorder team members
              </div>
              {sortedMembers.map((member: TeamMember, index: number) => (
                <div
                  key={member.id}
                  draggable={!editingMember}
                  onDragStart={(e) => handleDragStart(e, member)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-start gap-4 p-4 border rounded-lg transition-all cursor-move ${
                    isDragging && draggedItem?.id === member.id
                      ? 'opacity-50'
                      : ''
                  } ${
                    dragOverIndex === index
                      ? 'border-primary bg-primary/5'
                      : ''
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="flex items-center mt-6">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xl text-muted-foreground">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                  )}

                  <div className="flex-1">
                    {editingMember?.id === member.id ? (
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-3">
                            <Input
                              value={editingMember.name}
                              onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                              placeholder="Name"
                            />
                            <Input
                              value={editingMember.title}
                              onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                              placeholder="Title"
                            />
                            <Textarea
                              value={editingMember.description}
                              onChange={(e) => setEditingMember({ ...editingMember, description: e.target.value })}
                              placeholder="Description"
                              className="min-h-[60px]"
                            />
                          </div>
                          <div>
                            {editingMember.imageUrl ? (
                              <div className="relative">
                                <img
                                  src={editingMember.imageUrl}
                                  alt="Preview"
                                  className="w-24 h-24 object-cover rounded-lg"
                                />
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="absolute -top-2 -right-2"
                                  onClick={() => setEditingMember({ ...editingMember, imageUrl: undefined })}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <label className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground mt-1">Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleEditImageUpload}
                                  disabled={editUploadingImage}
                                />
                              </label>
                            )}
                            {editUploadingImage && (
                              <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => updateMutation.mutate(editingMember)}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingMember(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-primary">{member.title}</p>
                        <p className="text-sm font-semibold text-muted-foreground mt-1">{member.description}</p>
                      </>
                    )}
                  </div>

                  {!editingMember && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingMember(member);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          member.id && deleteMutation.mutate(member.id);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Why We Started Editor Component
function WhyWeStartedEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [whyWeStartedData, setWhyWeStartedData] = useState({
    paragraph1: 'Fencing has traditionally been an exclusive sport - expensive equipment, costly lessons, and limited access. We saw talented kids being turned away simply because they couldn\'t afford $500 for basic gear or $150/month for coaching.',
    paragraph2: 'In 2022, we started with one simple goal: make fencing accessible to every child who wants to learn, regardless of their family\'s financial situation.',
    paragraph3: 'Today, we provide free equipment loans, no-cost coaching, and competition opportunities to over 200 students annually. Every piece of equipment is donated or purchased through community fundraising. Every coach volunteers their time. Every child gets the same high-quality training.',
    mission: 'To eliminate financial barriers in youth fencing by providing free equipment, professional coaching, and competition opportunities to underserved communities.',
    vision: 'A future where every child can pursue fencing based on their passion and dedication, not their parents\' income.',
    value1: 'Equal access for all students',
    value2: 'Excellence in coaching and mentorship',
    value3: 'Building character through sport',
    value4: 'Community over competition'
  });

  // Fetch existing Why We Started image
  const { data: mediaFiles = [] } = useQuery({
    queryKey: ['admin-media'],
    queryFn: async () => {
      const response = await fetch('/api/admin/media');
      if (!response.ok) throw new Error('Failed to fetch media');
      return response.json();
    },
  });

  // Find the Why We Started image
  useEffect(() => {
    const whyWeStartedImage = mediaFiles.find((file: any) =>
      file.category === 'why-we-started' && file.mimeType?.startsWith('image/')
    );
    if (whyWeStartedImage) {
      setImageUrl(`/uploads/${whyWeStartedImage.filePath}`);
    }
  }, [mediaFiles]);

  // handleImageUpload function removed - using MediaUpload component instead

  // Save content mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const updates = Object.entries(whyWeStartedData).map(([key, value]) => ({
        pageId: 'about',
        sectionId: 'why-we-started',
        contentType: 'text',
        content: value,
        metadata: { key }
      }));

      const response = await fetch('/api/admin/page-content/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      if (!response.ok) throw new Error('Failed to save content');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Why We Started content updated' });
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save content',
        variant: 'destructive'
      });
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Why We Started Content</CardTitle>
          <CardDescription>
            Edit the text content for the Why We Started section on the About page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Image Section */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-4">Section Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {imageUrl ? (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Why we started"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setImageUrl(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <MediaUpload
                    category="why-we-started"
                    onUploadSuccess={(data) => {
                      setImageUrl(data.url);
                      toast({ title: 'Success', description: 'Image uploaded successfully' });
                      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
                      queryClient.invalidateQueries({ queryKey: ['media-files'] });
                    }}
                    accept="image/*"
                    maxSize={10}
                  />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">• Recommended size: 800x600px or larger</p>
                <p className="mb-2">• Supported formats: JPG, PNG, WebP</p>
                <p className="mb-2">• Free aspect ratio - no forced cropping</p>
                <p>• This image will appear on the right side of the "Why We Started" section</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div>
              <Label>First Paragraph</Label>
              <Textarea
                value={whyWeStartedData.paragraph1}
                onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, paragraph1: e.target.value })}
                className="min-h-[100px]"
                placeholder="Describe the problem..."
              />
            </div>

            <div>
              <Label>Second Paragraph</Label>
              <Textarea
                value={whyWeStartedData.paragraph2}
                onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, paragraph2: e.target.value })}
                className="min-h-[100px]"
                placeholder="When and why we started..."
              />
            </div>

            <div>
              <Label>Third Paragraph</Label>
              <Textarea
                value={whyWeStartedData.paragraph3}
                onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, paragraph3: e.target.value })}
                className="min-h-[100px]"
                placeholder="What we do today..."
              />
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div>
                <Label>Our Mission</Label>
                <Textarea
                  value={whyWeStartedData.mission}
                  onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, mission: e.target.value })}
                  className="min-h-[80px]"
                  placeholder="Mission statement..."
                />
              </div>

              <div>
                <Label>Our Vision</Label>
                <Textarea
                  value={whyWeStartedData.vision}
                  onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, vision: e.target.value })}
                  className="min-h-[80px]"
                  placeholder="Vision statement..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Our Values</Label>
              <div className="space-y-2">
                <Input
                  value={whyWeStartedData.value1}
                  onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, value1: e.target.value })}
                  placeholder="Value 1"
                />
                <Input
                  value={whyWeStartedData.value2}
                  onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, value2: e.target.value })}
                  placeholder="Value 2"
                />
                <Input
                  value={whyWeStartedData.value3}
                  onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, value3: e.target.value })}
                  placeholder="Value 3"
                />
                <Input
                  value={whyWeStartedData.value4}
                  onChange={(e) => setWhyWeStartedData({ ...whyWeStartedData, value4: e.target.value })}
                  placeholder="Value 4"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? 'Saving...' : 'Save Why We Started Content'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminEditorPage() {
  const [selectedPage, setSelectedPage] = useState<keyof typeof SITE_PAGES>('home');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [missionData, setMissionData] = useState<MissionContent>({
    title: 'Our Mission:',
    subtitle: 'Breaking Barriers in Sport',
    description1: 'Founded in 2022, Fencing for Everyone emerged from a simple belief: every student deserves the opportunity to discover their potential through sport, regardless of their economic background.',
    description2: 'Through our comprehensive programs, we provide free fencing instruction, equipment loans, and a supportive community that helps students build confidence, discipline, and lifelong friendships.',
    buttonText1: 'Learn More About Us',
    buttonLink1: '/about',
    buttonText2: 'View Our Impact Report',
    buttonLink2: '/impact',
    badgeText: '100%',
    badgeSubtext: 'Classes are FREE',
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock data for demonstration - this would come from your API
  const [pageContent, setPageContent] = useState<Record<string, ContentItem[]>>({
    'home-hero': [
      { id: '1', type: 'image', content: 'hero-image-url', metadata: { alt: 'Hero Image' } },
      { id: '2', type: 'text', content: 'Making Fencing Accessible to Everyone' }
    ],
    'home-stats': [
      { id: '3', type: 'data', content: { students: 50, gear: 63, athletes: 3, funds: 4000 } }
    ]
  });

  const currentPageConfig = SITE_PAGES[selectedPage];

  const handleSectionEdit = (sectionId: string) => {
    setSelectedSection(sectionId);
    setEditMode(true);
  };

  const handleSave = async () => {
    if (selectedSection === 'mission') {
      try {
        // Save each field as a separate content item
        const contentItems = [
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.title, metadata: { key: 'title' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.subtitle, metadata: { key: 'subtitle' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.description1, metadata: { key: 'description1' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.description2, metadata: { key: 'description2' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.buttonText1, metadata: { key: 'buttonText1' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.buttonLink1, metadata: { key: 'buttonLink1' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.buttonText2, metadata: { key: 'buttonText2' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.buttonLink2, metadata: { key: 'buttonLink2' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.badgeText, metadata: { key: 'badgeText' } },
          { pageId: 'home', sectionId: 'mission', contentType: 'text', content: missionData.badgeSubtext, metadata: { key: 'badgeSubtext' } },
        ];

        for (const item of contentItems) {
          await fetch('/api/admin/page-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
        }

        toast({
          title: "Changes Saved",
          description: "Mission section has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save changes",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Changes Saved",
        description: "Your content has been updated successfully.",
      });
    }
    setEditMode(false);
  };

  const renderSectionEditor = () => {
    if (!selectedSection) return null;
    
    const section = currentPageConfig.sections.find(s => s.id === selectedSection);
    if (!section) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Editing: {section.name}</span>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditMode(false)}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </CardTitle>
          <CardDescription>{section.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {section.type === 'media' && (
            <div className="space-y-4">
              <MediaUpload 
                category={section.id}
                onUploadSuccess={(data) => {
                  toast({
                    title: "Media Updated",
                    description: `${section.name} has been updated with new media`,
                  });
                  console.log('Uploaded media:', data);
                  queryClient.invalidateQueries({ queryKey: ["media"] });
                }}
                accept="image/*,video/*,audio/*"
                maxSize={200}
              />
              
              <div className="mt-6">
                <Label className="mb-2 block">
                  {section.id === 'hero' ? 'Current Hero Media' : 'Current Media'}
                </Label>
                {section.id === 'hero' && (
                  <p className="text-sm text-muted-foreground mb-3">
                    The most recent upload (image or video) will be displayed. Videos will play automatically.
                  </p>
                )}
                <MediaGalleryAdmin 
                  category={section.id}
                  limit={section.id === 'hero' ? 2 : 4}
                  showFilters={false}
                  columns={section.id === 'hero' ? 1 : 2}
                  allowDelete={true}
                  singleImageMode={false}
                />
              </div>
            </div>
          )}

          {section.type === 'content' && (
            <div className="space-y-4">
              <div>
                <Label>Heading</Label>
                <Input placeholder="Section heading" />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea 
                  placeholder="Main content text..." 
                  className="min-h-[200px]"
                />
              </div>
              <div>
                <Label>Call to Action</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Button text" />
                  <Input placeholder="Button link" />
                </div>
              </div>
            </div>
          )}

          {section.type === 'video' && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Upload Video</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload a video file (MP4, WebM recommended). Max size: 200MB
                </p>
              </div>
              
              <MediaUpload 
                category={section.id}
                onUploadSuccess={(data) => {
                  toast({
                    title: "Video Updated",
                    description: `${section.name} has been updated`,
                  });
                  queryClient.invalidateQueries({ queryKey: ["media"] });
                }}
                accept="video/*"
                maxSize={200}
              />
              
              <div className="mt-6">
                <Label className="mb-2 block">Current Video</Label>
                <MediaGalleryAdmin 
                  category={section.id}
                  limit={1}
                  showFilters={false}
                  columns={1}
                  allowDelete={true}
                  singleImageMode={false}
                />
              </div>
            </div>
          )}

          {section.type === 'gallery' && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Add New Media to Gallery</Label>
                <MediaUpload 
                  category={section.id}
                  onUploadSuccess={(data) => {
                    toast({
                      title: "Added to Gallery",
                      description: "New media has been added to the gallery",
                    });
                  }}
                />
              </div>
              
              <div className="mt-6">
                <Label className="mb-2 block">Current Gallery Items</Label>
                <MediaGalleryAdmin 
                  category={section.id}
                  showFilters={false}
                  columns={4}
                  allowDelete={true}
                  singleImageMode={false}
                />
              </div>
            </div>
          )}

          {section.type === 'cards' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Content Cards</Label>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Card
                </Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-start">
                        <div className="w-20 h-20 bg-muted rounded" />
                        <div className="space-y-2">
                          <Input placeholder="Card title" />
                          <Textarea placeholder="Card description" className="min-h-[60px]" />
                        </div>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {section.type === 'mission' && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Manage the Mission section content including text and image for "Breaking Barriers in Sport"
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Title (First Part)</Label>
                    <Input
                      placeholder="Our Mission:"
                      value={missionData.title}
                      onChange={(e) => setMissionData({ ...missionData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Title (Highlighted Part)</Label>
                    <Input
                      placeholder="Breaking Barriers in Sport"
                      value={missionData.subtitle}
                      onChange={(e) => setMissionData({ ...missionData, subtitle: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>First Paragraph</Label>
                    <Textarea
                      placeholder="Founded in 2022..."
                      value={missionData.description1}
                      onChange={(e) => setMissionData({ ...missionData, description1: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Second Paragraph</Label>
                    <Textarea
                      placeholder="Through our comprehensive programs..."
                      value={missionData.description2}
                      onChange={(e) => setMissionData({ ...missionData, description2: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Button 1 Text</Label>
                      <Input
                        placeholder="Learn More About Us"
                        value={missionData.buttonText1}
                        onChange={(e) => setMissionData({ ...missionData, buttonText1: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Button 1 Link</Label>
                      <Input
                        placeholder="/about"
                        value={missionData.buttonLink1}
                        onChange={(e) => setMissionData({ ...missionData, buttonLink1: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Button 2 Text</Label>
                      <Input
                        placeholder="View Our Impact Report"
                        value={missionData.buttonText2}
                        onChange={(e) => setMissionData({ ...missionData, buttonText2: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Button 2 Link</Label>
                      <Input
                        placeholder="/impact"
                        value={missionData.buttonLink2}
                        onChange={(e) => setMissionData({ ...missionData, buttonLink2: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Badge Text (Big)</Label>
                      <Input
                        placeholder="100%"
                        value={missionData.badgeText}
                        onChange={(e) => setMissionData({ ...missionData, badgeText: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Badge Subtext</Label>
                      <Input
                        placeholder="Classes are FREE"
                        value={missionData.badgeSubtext}
                        onChange={(e) => setMissionData({ ...missionData, badgeSubtext: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Mission Section Image</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload an image that represents your mission. Recommended size: 800x600px
                    </p>
                    <MediaUpload
                      category="mission-image"
                      onUploadSuccess={(data) => {
                        toast({
                          title: "Image Updated",
                          description: "Mission section image has been updated",
                        });
                        queryClient.invalidateQueries({ queryKey: ["media"] });
                      }}
                      accept="image/*"
                      maxSize={10}
                    />
                  </div>

                  <div className="mt-6">
                    <Label className="mb-2 block">Current Mission Image</Label>
                    <MediaGalleryAdmin
                      category="mission-image"
                      limit={1}
                      showFilters={false}
                      columns={1}
                      allowDelete={true}
                      singleImageMode={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {section.type === 'team' && (
            <div className="space-y-4">
              <TeamMemberManager
                category={
                  section.id === 'advisors' ? 'advisors' :
                  section.id === 'partners' ? 'partners' :
                  'leadership'
                }
                sectionName={section.name}
              />
            </div>
          )}

          {section.type === 'why-we-started' && (
            <WhyWeStartedEditor />
          )}

          {section.type === 'about-mission' && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Manage the About page mission section content and image
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Mission Title</Label>
                    <Input placeholder="Our Mission: Incubator for Youth Athletic Excellence" defaultValue="Our Mission: Incubator for Youth Athletic Excellence" />
                  </div>

                  <div>
                    <Label>First Paragraph</Label>
                    <Textarea
                      placeholder="We are an incubator..."
                      defaultValue="We are an incubator for youth athletic development. Students have dreams, and we provide resources and mentorship to bring them to life."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Second Paragraph</Label>
                    <Textarea
                      placeholder="We exist to democratize..."
                      defaultValue="We exist to democratize athletic education and create pathways for young people to develop the skills, networks, and resources they need to excel in their sport and beyond."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Third Paragraph</Label>
                    <Textarea
                      placeholder="Through our programs..."
                      defaultValue="Through our programs, events, and training platform, we've created a global ecosystem where youth can learn, connect, and launch careers that create positive social impact."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Goal Statement</Label>
                    <Input placeholder="Empowering 100,000 young athletes by 2030" defaultValue="Empowering 100,000 young athletes by 2030" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">About Mission Image</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload an image for the mission section. Recommended size: 800x600px
                    </p>
                    <MediaUpload
                      category="about-mission"
                      onUploadSuccess={() => {
                        toast({
                          title: "Image Updated",
                          description: "About mission image has been updated",
                        });
                        queryClient.invalidateQueries({ queryKey: ["media"] });
                      }}
                      accept="image/*"
                      maxSize={10}
                    />
                  </div>

                  <div className="mt-6">
                    <Label className="mb-2 block">Current Mission Image</Label>
                    <MediaGalleryAdmin
                      category="about-mission"
                      limit={1}
                      showFilters={false}
                      columns={1}
                      allowDelete={true}
                      singleImageMode={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {section.type === 'data' && (
            <div className="space-y-4">
              <Label>Data Fields</Label>
              {section.id === 'stats' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Students Helped</Label>
                    <Input type="number" placeholder="50" />
                  </div>
                  <div>
                    <Label className="text-sm">Gear Collected</Label>
                    <Input type="number" placeholder="63" />
                  </div>
                  <div>
                    <Label className="text-sm">Scholarship Athletes</Label>
                    <Input type="number" placeholder="3" />
                  </div>
                  <div>
                    <Label className="text-sm">Funds Raised</Label>
                    <Input type="number" placeholder="4000" />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Site Content Editor</h1>
              <p className="text-sm text-muted-foreground">
                Manage all content, images, and videos across your entire website
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Exit Preview' : 'Preview'}
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-[250px,1fr] gap-8">
          {/* Page Selector Sidebar */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Pages</h3>
              <div className="space-y-1">
                {Object.entries(SITE_PAGES).map(([key, page]) => {
                  const Icon = page.icon;
                  return (
                    <Button
                      key={key}
                      variant={selectedPage === key ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedPage(key as keyof typeof SITE_PAGES);
                        setSelectedSection(null);
                        setEditMode(false);
                      }}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {page.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Layout className="h-4 w-4 mr-2" />
                  Site Settings
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Theme & Colors
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Type className="h-4 w-4 mr-2" />
                  Fonts & Typography
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            {!editMode ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {React.createElement(currentPageConfig.icon, { className: "h-5 w-5 mr-2" })}
                      {currentPageConfig.name} - Page Sections
                    </CardTitle>
                    <CardDescription>
                      Click on any section to edit its content, images, or videos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentPageConfig.sections.map((section) => (
                        <Card 
                          key={section.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleSectionEdit(section.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold flex items-center">
                                  {section.type === 'media' && <ImageIcon className="h-4 w-4 mr-2" />}
                                  {section.type === 'video' && <Video className="h-4 w-4 mr-2" />}
                                  {section.type === 'content' && <FileText className="h-4 w-4 mr-2" />}
                                  {section.type === 'gallery' && <ImageIcon className="h-4 w-4 mr-2" />}
                                  {section.type === 'cards' && <Layout className="h-4 w-4 mr-2" />}
                                  {section.type === 'data' && <Settings className="h-4 w-4 mr-2" />}
                                  {section.type === 'form' && <Mail className="h-4 w-4 mr-2" />}
                                  {section.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {section.description}
                                </p>
                              </div>
                              <Button size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Live Preview */}
                {previewMode && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Live Preview</CardTitle>
                      <CardDescription>
                        This shows how your page will look with current content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg p-4 min-h-[400px] bg-muted/20">
                        <iframe 
                          src={`/${selectedPage === 'home' ? '' : selectedPage}`}
                          className="w-full h-[600px] rounded-lg"
                          title="Page Preview"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              renderSectionEditor()
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}