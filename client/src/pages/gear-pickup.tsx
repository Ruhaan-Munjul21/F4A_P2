import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Shirt, Users, GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const gearPickupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  studentAge: z.number().min(5, "Age must be at least 5").max(99, "Age must be less than 99"),
  equipmentNeeded: z.string().min(10, "Please provide details about equipment needed"),
  experienceLevel: z.string().min(1, "Please select experience level"),
  programEnrolled: z.string().optional(),
  preferredPickupTime: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type GearPickupFormData = z.infer<typeof gearPickupSchema>;

export default function GearPickup() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<GearPickupFormData>({
    resolver: zodResolver(gearPickupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentAge: 0,
      equipmentNeeded: "",
      experienceLevel: "",
      programEnrolled: "",
      preferredPickupTime: "",
      additionalInfo: "",
    },
  });

  const pickupMutation = useMutation({
    mutationFn: async (data: GearPickupFormData) => {
      return await apiRequest("/api/gear-pickups", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Equipment Request Submitted!",
        description: "We'll contact you within 2 business days to arrange equipment pickup.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/gear-pickups"] });
    },
    onError: (error) => {
      toast({
        title: "Request Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GearPickupFormData) => {
    pickupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Header */}
        <div className="mb-8">
          <Link href="/marketplace">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Request <span className="text-primary">Equipment</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need fencing equipment for classes or practice? Request gear from our donated inventory - completely free.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Shirt className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Free Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">All equipment is provided at no cost to families</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Quality Gear</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Donated equipment is cleaned and inspected for safety</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Take Home</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Students can keep basic equipment to practice at home</p>
            </CardContent>
          </Card>
        </div>

        {/* Request Form */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Request Form</CardTitle>
            <p className="text-sm text-muted-foreground">
              Tell us about your equipment needs and we'll match you with suitable gear from our inventory.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Student Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Student Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="studentAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Age *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="complete-beginner">Complete Beginner (never fenced)</SelectItem>
                            <SelectItem value="some-lessons">Some Lessons (less than 6 months)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (6 months - 2 years)</SelectItem>
                            <SelectItem value="advanced">Advanced (2+ years)</SelectItem>
                            <SelectItem value="competitive">Competitive Fencer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="programEnrolled"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Enrolled (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select program if enrolled" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="youth-classes">Youth Classes</SelectItem>
                            <SelectItem value="summer-camp">Summer Camp</SelectItem>
                            <SelectItem value="competition-training">Competition Training</SelectItem>
                            <SelectItem value="not-enrolled">Not Currently Enrolled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Equipment Needs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Equipment Needs</h3>
                  
                  <FormField
                    control={form.control}
                    name="equipmentNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment Needed *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please list specific equipment needed (e.g., mask size small, foil weapon, jacket size medium, etc.). Include any size requirements or preferences..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Common items: masks, jackets, gloves, weapons (foil/epee/sabre), pants, shoes, bags
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pickup Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pickup Preferences</h3>
                  
                  <FormField
                    control={form.control}
                    name="preferredPickupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Pickup Time (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="before-class">Before Class Session</SelectItem>
                            <SelectItem value="after-class">After Class Session</SelectItem>
                            <SelectItem value="weekday-morning">Weekday Morning (9am-12pm)</SelectItem>
                            <SelectItem value="weekday-afternoon">Weekday Afternoon (12pm-5pm)</SelectItem>
                            <SelectItem value="weekend-morning">Weekend Morning (9am-12pm)</SelectItem>
                            <SelectItem value="weekend-afternoon">Weekend Afternoon (12pm-5pm)</SelectItem>
                            <SelectItem value="flexible">I'm flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special requirements, timing constraints, or other information that would help us serve you better..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-lg">
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    <strong>What happens next?</strong> Our equipment coordinator will review your request and check our current inventory. 
                    We'll contact you within 2 business days to confirm availability and arrange pickup at our facility.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={pickupMutation.isPending}
                >
                  {pickupMutation.isPending ? "Submitting..." : "Submit Equipment Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}