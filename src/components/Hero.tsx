import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🎓 Digital Mental Health Support for Students
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            MindCare
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Mental Health Platform
            </span>
          </h1>

          {/* Problem Statement */}
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-xl font-semibold mb-4">Addressing the Mental Health Crisis in Higher Education</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mental health issues among college students have significantly increased, including anxiety, depression, 
              burnout, and academic stress. MindCare provides a comprehensive digital intervention system with 
              AI-guided support, confidential counseling, and peer community.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto text-left">
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

          {/* Admin Dashboard Info */}
          <div className="max-w-2xl mx-auto mb-8 p-6 rounded-lg bg-muted/30 border border-border">
            <h3 className="font-semibold mb-2">📊 Admin Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Anonymous data analytics for authorities to recognize trends and plan targeted interventions. 
              Helps institutions make data-driven decisions for student mental health support.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Explore Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
            >
              View Components
            </Button>
          </div>

          {/* Tech Note */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Frontend ready for backend integration • Uses Gemini AI for chat support • Built for hackathon development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;