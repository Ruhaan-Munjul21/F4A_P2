import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Trophy, Upload } from "lucide-react";
import type { ScholarshipAthlete } from "@shared/schema";

export default function ScholarshipAthletesAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState<ScholarshipAthlete | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    school: "",
    bio: "",
    achievements: "",
    scholarshipYear: "",
    imageUrl: "",
    ordering: "",
    isActive: true
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch scholarship athletes
  const { data: athletes = [], isLoading } = useQuery<ScholarshipAthlete[]>({
    queryKey: ["/api/admin/scholarship-athletes"],
    queryFn: async () => {
      const response = await fetch("/api/admin/scholarship-athletes");
      if (!response.ok) throw new Error("Failed to fetch scholarship athletes");
      const data = await response.json();

      // Parse achievements from JSON string to array
      return data.map((athlete: any) => ({
        ...athlete,
        achievements: athlete.achievements
          ? (typeof athlete.achievements === 'string'
              ? JSON.parse(athlete.achievements)
              : athlete.achievements)
          : []
      }));
    },
  });

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const url = editingAthlete
        ? `/api/admin/scholarship-athletes/${editingAthlete.id}`
        : "/api/admin/scholarship-athletes";

      const method = editingAthlete ? "PUT" : "POST";

      // Parse achievements from comma-separated string to array
      const achievementsArray = data.achievements
        ? data.achievements.split(",").map((a: string) => a.trim()).filter((a: string) => a)
        : [];

      const payload = {
        ...data,
        age: data.age ? parseInt(data.age) : null,
        ordering: data.ordering ? parseInt(data.ordering) : 0,
        achievements: achievementsArray,
        isActive: data.isActive !== false
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save athlete");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/scholarship-athletes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/scholarship-athletes"] });
      toast({
        title: "Success",
        description: `Scholarship athlete ${editingAthlete ? "updated" : "created"} successfully`,
      });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/scholarship-athletes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete athlete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/scholarship-athletes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/scholarship-athletes"] });
      toast({
        title: "Success",
        description: "Scholarship athlete deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleOpenDialog = (athlete?: ScholarshipAthlete) => {
    if (athlete) {
      setEditingAthlete(athlete);
      setFormData({
        name: athlete.name || "",
        age: athlete.age?.toString() || "",
        school: athlete.school || "",
        bio: athlete.bio || "",
        achievements: Array.isArray(athlete.achievements)
          ? athlete.achievements.join(", ")
          : "",
        scholarshipYear: athlete.scholarshipYear || "",
        imageUrl: athlete.imageUrl || "",
        ordering: athlete.ordering?.toString() || "0",
        isActive: athlete.isActive !== false
      });
    } else {
      setEditingAthlete(null);
      setFormData({
        name: "",
        age: "",
        school: "",
        bio: "",
        achievements: "",
        scholarshipYear: "",
        imageUrl: "",
        ordering: "0",
        isActive: true
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAthlete(null);
    setFormData({
      name: "",
      age: "",
      school: "",
      bio: "",
      achievements: "",
      scholarshipYear: "",
      imageUrl: "",
      ordering: "0",
      isActive: true
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this scholarship athlete?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Scholarship Athletes</h2>
          <p className="text-muted-foreground">Manage the scholarship athletes displayed on the endowment page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Athlete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingAthlete ? "Edit" : "Add"} Scholarship Athlete</DialogTitle>
                <DialogDescription>
                  Enter the athlete's information. The first two active athletes will be displayed on the page.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="scholarshipYear">Scholarship Year</Label>
                    <Input
                      id="scholarshipYear"
                      placeholder="e.g., 2024"
                      value={formData.scholarshipYear}
                      onChange={(e) => setFormData({ ...formData, scholarshipYear: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                  <Textarea
                    id="achievements"
                    rows={2}
                    placeholder="Regional Champion 2024, State Team Member"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="Firebase URL for athlete's photo"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload an image via the Media tab, then paste the URL here
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="ordering">Display Order</Label>
                  <Input
                    id="ordering"
                    type="number"
                    value={formData.ordering}
                    onChange={(e) => setFormData({ ...formData, ordering: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower numbers appear first (0, 1, 2, etc.)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isActive">Active (shown on website)</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading athletes...</p>
        </div>
      ) : athletes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No scholarship athletes yet. Click "Add Athlete" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {athletes.map((athlete) => (
            <Card key={athlete.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    {athlete.imageUrl && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={athlete.imageUrl}
                          alt={athlete.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{athlete.name}</h3>
                        {athlete.scholarshipYear && (
                          <span className="text-sm px-2 py-1 bg-yellow-500 text-white rounded">
                            {athlete.scholarshipYear}
                          </span>
                        )}
                        {!athlete.isActive && (
                          <span className="text-sm px-2 py-1 bg-gray-400 text-white rounded">
                            Inactive
                          </span>
                        )}
                        <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded">
                          Order: {athlete.ordering}
                        </span>
                      </div>
                      {athlete.school && (
                        <p className="text-sm text-muted-foreground mb-2">{athlete.school}</p>
                      )}
                      {athlete.bio && (
                        <p className="text-sm text-muted-foreground mb-2">{athlete.bio}</p>
                      )}
                      {athlete.achievements && athlete.achievements.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {athlete.achievements.map((achievement, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(athlete)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(athlete.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
          <CardDescription>How to add athlete photos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-primary">1.</span>
            <p>Go to the "Upload Media" tab and upload the athlete's photo</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-primary">2.</span>
            <p>After uploading, find the image in the "Media Gallery" tab</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-primary">3.</span>
            <p>Copy the image URL</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-primary">4.</span>
            <p>Come back to this tab and paste the URL in the "Image URL" field when adding/editing an athlete</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
