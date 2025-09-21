
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Helper function to scroll to a section
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🎓 Digital Mental Health Support for Students
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            MindCare
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Mental Health Platform
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-xl font-semibold mb-4">Addressing the Mental Health Crisis in Higher Education</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mental health issues among college students have significantly increased, including anxiety, depression, 
              burnout, and academic stress. MindCare provides a comprehensive digital intervention system with 
              AI-guided support, confidential counseling, and peer community.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white hover:opacity-90 transition-opacity"
              >
                Start Your Healing Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollTo('features')}
              className="w-full sm:w-auto"
            >
              Explore Features
            </Button>
          </div>

          {/* Feature Badges - "HIPAA Compliant" has been removed as requested */}
          <div className="flex justify-center items-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-green-500" />
              <span>24/7 Crisis Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Peer Verified</span>
            </div>
          </div>

          {/* Key Features Section with ID for scrolling */}
          <div id="features" className="grid md:grid-cols-2 gap-6 my-12 max-w-4xl mx-auto text-left">
             <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">🤖 AI-Guided First-Aid Support</h3>
              <p className="text-sm text-muted-foreground">
                Interactive chatbot offering coping strategies and professional referrals (powered by Gemini AI)
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">📅 Confidential Booking System</h3>
              <p className="text-sm text-muted-foreground">
                Secure appointment scheduling with on-campus counselors and mental health helplines
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">📚 Psychoeducational Resources</h3>
              <p className="text-sm text-muted-foreground">
                Videos, relaxation audio, and wellness guides available in regional languages
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">🤝 Peer Support Platform</h3>
              <p className="text-sm text-muted-foreground">
                Moderated forums with trained student volunteers for peer-to-peer support
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-muted/30 border border-border">
            <h3 className="font-semibold mb-2">📊 Admin Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Anonymous data analytics for authorities to recognize trends and plan targeted interventions. 
              Helps institutions make data-driven decisions for student mental health support.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
