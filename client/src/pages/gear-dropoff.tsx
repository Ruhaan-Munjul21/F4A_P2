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
import { Package, Heart, HandHeart, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const gearDropoffSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  itemDescription: z.string().min(10, "Please provide a detailed description (minimum 10 characters)"),
  itemCondition: z.string().min(1, "Please select item condition"),
  itemCategory: z.string().min(1, "Please select item category"),
  estimatedValue: z.string().optional(),
  preferredDropoffTime: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type GearDropoffFormData = z.infer<typeof gearDropoffSchema>;

export default function GearDropoff() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<GearDropoffFormData>({
    resolver: zodResolver(gearDropoffSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      itemDescription: "",
      itemCondition: "",
      itemCategory: "",
      estimatedValue: "",
      preferredDropoffTime: "",
      additionalNotes: "",
    },
  });

  const dropoffMutation = useMutation({
    mutationFn: async (data: GearDropoffFormData) => {
      return await apiRequest("/api/gear-dropoffs", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Donation Request Submitted!",
        description: "Thank you for your generosity. We'll contact you to arrange pickup/dropoff.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/gear-dropoffs"] });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GearDropoffFormData) => {
    dropoffMutation.mutate(data);
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
              Donate <span className="text-primary">Fencing Gear</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help a student discover their passion for fencing by donating equipment you no longer need.
            </p>
          </div>
        </div>

        {/* Impact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Make an Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your donation directly supports a student's fencing journey</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Any Condition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We accept gear in any condition - we can refurbish or repurpose</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <HandHeart className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Easy Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We'll arrange pickup or you can drop off at our facility</p>
            </CardContent>
          </Card>
        </div>

        {/* Donation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Gear Donation Form</CardTitle>
            <p className="text-sm text-muted-foreground">
              Please provide details about the equipment you'd like to donate.
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

                {/* Item Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Item Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="itemCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select item category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masks">Masks</SelectItem>
                            <SelectItem value="jackets">Jackets</SelectItem>
                            <SelectItem value="gloves">Gloves</SelectItem>
                            <SelectItem value="weapons">Weapons (Foil/Epee/Sabre)</SelectItem>
                            <SelectItem value="pants">Pants</SelectItem>
                            <SelectItem value="shoes">Shoes</SelectItem>
                            <SelectItem value="bags">Bags</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                            <SelectItem value="complete-set">Complete Set</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="itemCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Condition *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New (never used)</SelectItem>
                            <SelectItem value="like-new">Like New (minimal use)</SelectItem>
                            <SelectItem value="good">Good (some wear, fully functional)</SelectItem>
                            <SelectItem value="fair">Fair (noticeable wear, needs minor repair)</SelectItem>
                            <SelectItem value="poor">Poor (significant wear, needs major repair)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="itemDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide a detailed description including brand, size, model, and any relevant details..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="estimatedValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Value (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="$0.00" {...field} />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">Approximate original retail value (for tax deduction purposes)</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Logistics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dropoff Preferences</h3>
                  
                  <FormField
                    control={form.control}
                    name="preferredDropoffTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Dropoff Time (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekday-morning">Weekday Morning (9am-12pm)</SelectItem>
                            <SelectItem value="weekday-afternoon">Weekday Afternoon (12pm-5pm)</SelectItem>
                            <SelectItem value="weekday-evening">Weekday Evening (5pm-8pm)</SelectItem>
                            <SelectItem value="weekend-morning">Weekend Morning (9am-12pm)</SelectItem>
                            <SelectItem value="weekend-afternoon">Weekend Afternoon (12pm-5pm)</SelectItem>
                            <SelectItem value="pickup-needed">I need pickup from my location</SelectItem>
                            <SelectItem value="flexible">I'm flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special instructions, pickup address, or other information..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>What happens next?</strong> We'll review your donation and contact you within 2 business days to arrange pickup or dropoff. 
                    You'll receive a tax-deductible donation receipt once we process your items.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={dropoffMutation.isPending}
                >
                  {dropoffMutation.isPending ? "Submitting..." : "Submit Donation Request"}
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