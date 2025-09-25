import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader2, Heart, Users, Star, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ApplicationData {
  full_name: string;
  email: string;
  year_of_study: string;
  areas_of_interest: string[];
  previous_experience: string;
  motivation: string;
  availability: string;
  emergency_contact: string;
  agreed_to_terms: boolean;
}

const PeerHelperApplicationConnected = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ApplicationData>({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    year_of_study: "",
    areas_of_interest: [],
    previous_experience: "",
    motivation: "",
    availability: "",
    emergency_contact: "",
    agreed_to_terms: false
  });

  const areasOfInterest = [
    "Academic Stress",
    "Social Anxiety", 
    "Depression Support",
    "Study Skills",
    "Time Management",
    "Relationship Issues",
    "Homesickness",
    "Career Guidance",
    "Addiction Support",
    "Grief & Loss"
  ];

  const yearOptions = [
    "1st Year",
    "2nd Year", 
    "3rd Year",
    "4th Year",
    "Graduate Student",
    "PhD Student"
  ];

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas_of_interest: prev.areas_of_interest.includes(area)
        ? prev.areas_of_interest.filter(a => a !== area)
        : [...prev.areas_of_interest, area]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to submit your application");
      return;
    }

    if (!formData.agreed_to_terms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (formData.areas_of_interest.length === 0) {
      toast.error("Please select at least one area of interest");
      return;
    }

    setLoading(true);

    try {
      // Store application in a table (you'll need to create this table)
      const applicationData = {
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        year_of_study: formData.year_of_study,
        areas_of_interest: formData.areas_of_interest,
        previous_experience: formData.previous_experience,
        motivation: formData.motivation,
        availability: formData.availability,
        emergency_contact: formData.emergency_contact,
        status: 'pending',
        applied_at: new Date().toISOString()
      };

      // For now, we'll store this as a JSON in a generic applications table
      // In a real app, you'd want a dedicated peer_helper_applications table
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          title: `Peer Helper Application - ${formData.full_name}`,
          content: JSON.stringify(applicationData),
          category: 'Peer Helper Application',
          tags: ['application', 'peer-helper']
        });

      if (error) {
        console.error('Error submitting application:', error);
        toast.error("Failed to submit application. Please try again.");
        return;
      }

      setSubmitted(true);
      toast.success("Application submitted successfully! We'll review it within 3-5 business days.");

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="shadow-elegant border-border/50 bg-background/80 backdrop-blur-sm">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-success">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in becoming a peer helper. We'll review your application 
                  and get back to you within 3-5 business days.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• You'll receive an email confirmation shortly</p>
                  <p>• Our team will review your application thoroughly</p>
                  <p>• If selected, you'll be invited for a brief interview</p>
                  <p>• Training sessions will be scheduled after acceptance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              🤝 Make a Difference
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Peer Helper Application
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our team of trained student volunteers and help create a supportive community 
              for your fellow students.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Make Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Directly support fellow students through challenging times
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Build Skills</h3>
                <p className="text-sm text-muted-foreground">
                  Develop leadership, communication, and empathy skills
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-border/50 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Star className="h-8 w-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Receive certificates and recommendations for your service
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <Card className="shadow-elegant border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      required
                    />
                    
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <Select 
                    value={formData.year_of_study}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, year_of_study: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year of study" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map(year => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Emergency Contact (Name & Phone)"
                    value={formData.emergency_contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                    required
                  />
                </div>

                {/* Areas of Interest */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Areas of Interest</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the areas where you'd like to provide peer support (select at least one):
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {areasOfInterest.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={formData.areas_of_interest.includes(area)}
                          onCheckedChange={() => handleAreaToggle(area)}
                        />
                        <label 
                          htmlFor={area} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience and Motivation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Experience & Motivation</h3>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Previous Experience (volunteering, leadership, etc.)
                    </label>
                    <Textarea
                      placeholder="Describe any relevant experience you have in helping others, leadership roles, or volunteer work..."
                      value={formData.previous_experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, previous_experience: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Why do you want to become a peer helper?
                    </label>
                    <Textarea
                      placeholder="Share your motivation for wanting to support fellow students..."
                      value={formData.motivation}
                      onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Availability
                    </label>
                    <Textarea
                      placeholder="When are you typically available to help peers? (e.g., weekday evenings, weekend mornings, etc.)"
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreed_to_terms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, agreed_to_terms: checked as boolean }))
                      }
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the terms and conditions, understand that I will need to complete training before starting, 
                      and commit to maintaining confidentiality and professionalism in all peer support interactions.
                    </label>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PeerHelperApplicationConnected;