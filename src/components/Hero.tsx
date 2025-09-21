
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Heart, Brain, Users } from "lucide-react";
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 wellness-section"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-8 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20 transition-colors px-6 py-2 text-sm font-medium">
            🧠 AI-Powered Mental Health Support for Students
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            MindCare
            <span className="block therapy-gradient bg-clip-text text-transparent mt-2">
              Your Therapeutic Companion
            </span>
          </h1>

          {/* Problem Statement */}
          <div className="max-w-4xl mx-auto mb-12 therapy-card p-8">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">Addressing the Mental Health Crisis</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Mental health challenges among students have reached unprecedented levels. MindCare provides 
              immediate, confidential, and comprehensive digital intervention with AI-guided support, 
              professional counseling connections, and peer community healing.
            </p>
          </div>
          
          {/* CTA Buttons - FUNCTIONALITY ADDED */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/signup">
                <Button 
                  size="lg" 
                  className="therapy-gradient hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-medium"
                >
                  Start Your Healing Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollTo('how-it-works')}
              className="border-2 hover:bg-primary/5 px-8 py-4 text-lg font-medium"
            >
              How It Works
            </Button>
          </div>

          {/* Key Features Section with ID for scrolling */}
          <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
            <div className="therapy-card p-6 text-center group hover:scale-105 transition-transform">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">AI First-Aid Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Immediate coping strategies and crisis intervention powered by advanced AI
              </p>
            </div>
            
            <div className="therapy-card p-6 text-center group hover:scale-105 transition-transform">
              <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">Secure Booking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Anonymous, confidential appointment scheduling with verified counselors
              </p>
            </div>
            
            <div className="therapy-card p-6 text-center group hover:scale-105 transition-transform">
              <div className="h-16 w-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-success/30 transition-colors">
                <Heart className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">Wellness Resources</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guided meditation, breathing exercises, and therapeutic content
              </p>
            </div>
            
            <div className="therapy-card p-6 text-center group hover:scale-105 transition-transform">
              <div className="h-16 w-16 bg-secondary/40 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/60 transition-colors">
                <Users className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">Peer Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Safe, moderated community with trained peer counselors
              </p>
            </div>
          </div>

          {/* Trust Indicators - HIPAA REMOVED */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-success" />
              24/7 Crisis Support
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-accent-foreground" />
              Peer Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
