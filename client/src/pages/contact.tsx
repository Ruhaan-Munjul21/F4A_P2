import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from "lucide-react";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (formData: any) => {
      return await apiRequest("POST", "/api/contact", formData);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
    },
    onError: () => {
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate({
      firstName,
      lastName,
      email,
      subject,
      message,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Have questions about our programs or want to get involved? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="registration">Class Registration</SelectItem>
                          <SelectItem value="equipment">Equipment Donation</SelectItem>
                          <SelectItem value="volunteer">Volunteer Opportunity</SelectItem>
                          <SelectItem value="corporate">Corporate Partnership</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Main Training Center</div>
                          <div className="text-muted-foreground">
                            123 Community Center Drive<br />
                            Anytown, ST 12345
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Phone</div>
                          <div className="text-muted-foreground">(555) 123-4567</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Email</div>
                          <div className="text-muted-foreground">info@fencingforeveryone.org</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Hours</div>
                          <div className="text-muted-foreground">
                            Mon-Fri: 4:00 PM - 9:00 PM<br />
                            Sat-Sun: 9:00 AM - 5:00 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-6">Follow Us</h3>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="icon" className="hover:bg-blue-600 hover:text-white">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-sky-500 hover:text-white">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-pink-600 hover:text-white">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-red-600 hover:text-white">
                        <Youtube className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Stay updated with our latest news, success stories, and upcoming events by following us on social media.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                        Frequently Asked Questions
                      </Button>
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                        Class Registration Process
                      </Button>
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                        Equipment Donation Guidelines
                      </Button>
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                        Volunteer Application
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our programs and services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Are the classes really free?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! All our classes, equipment use, and instruction are completely free. We're funded through donations and grants to ensure no student is turned away due to financial barriers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">What age groups do you serve?</h4>
                  <p className="text-sm text-muted-foreground">
                    We primarily serve students ages 8-17, with programs tailored for different age groups: 8-12 (youth), 13-17 (teens), and special programs for advanced competitors.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Do I need my own equipment?</h4>
                  <p className="text-sm text-muted-foreground">
                    No! We provide all necessary fencing equipment including masks, jackets, gloves, and weapons. Students just need to bring athletic shoes and comfortable clothing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">How do I register for classes?</h4>
                  <p className="text-sm text-muted-foreground">
                    Registration is simple! Create an account, fill out our registration form, and we'll contact you with class schedules and next steps within 24-48 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Can parents watch classes?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! We have comfortable viewing areas for parents and guardians. We encourage family involvement in our students' fencing journey.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Do you offer competitive opportunities?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! We have a competitive team program for advanced students, including local and regional tournament opportunities and scholarship possibilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
