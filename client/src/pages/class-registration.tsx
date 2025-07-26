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
import { Users, Trophy, GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const classRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  programType: z.string().min(1, "Please select a program"),
  ageGroup: z.string().min(1, "Please select an age group"),
  experience: z.string().min(1, "Please select experience level"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyPhone: z.string().min(1, "Emergency phone is required"),
  medicalInfo: z.string().optional(),
  parentName: z.string().optional(),
  parentEmail: z.string().optional(),
});

type ClassRegistrationFormData = z.infer<typeof classRegistrationSchema>;

export default function ClassRegistration() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ClassRegistrationFormData>({
    resolver: zodResolver(classRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      programType: "",
      ageGroup: "",
      experience: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalInfo: "",
      parentName: "",
      parentEmail: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: ClassRegistrationFormData) => {
      return await apiRequest("/api/class-registrations", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration Submitted!",
        description: "We'll contact you within 2 business days with next steps.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/class-registrations"] });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ClassRegistrationFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/services">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Register for <span className="text-primary">Free Classes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community and start your fencing journey today. All classes and equipment are completely free.
            </p>
          </div>
        </div>

        {/* Program Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Youth Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ages 8-17, all skill levels welcome</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <GraduationCap className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Summer Camps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Intensive week-long programs</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Competition Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Advanced training for tournaments</p>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Class Registration Form</CardTitle>
            <p className="text-sm text-muted-foreground">
              Please fill out all required fields. We'll contact you within 2 business days.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
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
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Program Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Program Selection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="programType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="youth-classes">Youth Classes</SelectItem>
                              <SelectItem value="summer-camp">Summer Camp</SelectItem>
                              <SelectItem value="competition-training">Competition Training</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ageGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age Group *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select age group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="8-10">8-10 years</SelectItem>
                              <SelectItem value="11-13">11-13 years</SelectItem>
                              <SelectItem value="14-17">14-17 years</SelectItem>
                              <SelectItem value="adult">Adult (18+)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="experience"
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
                            <SelectItem value="beginner">Beginner (no experience)</SelectItem>
                            <SelectItem value="some-experience">Some Experience (1-2 years)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (3+ years)</SelectItem>
                            <SelectItem value="advanced">Advanced/Competitive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emergencyPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Parent/Guardian Information (for minors) */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Parent/Guardian Information (if under 18)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Guardian Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="parentEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Guardian Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Medical Information */}
                <FormField
                  control={form.control}
                  name="medicalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please list any medical conditions, allergies, or special accommodations needed"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Submitting..." : "Submit Registration"}
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