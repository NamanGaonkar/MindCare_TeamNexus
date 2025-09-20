import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, Brain, Clock } from "lucide-react";

const Hero = () => {
  const features = [
    { icon: Brain, text: "AI-Powered Support" },
    { icon: Shield, text: "100% Confidential" },
    { icon: Users, text: "Peer Community" },
    { icon: Clock, text: "24/7 Available" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-calm overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            🎓 Designed for College Students
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Mental Health
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Support System
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Access confidential AI-guided support, connect with counselors, and join a caring 
            community. Breaking the stigma around mental health, one student at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              Start Free Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/5 hover:border-primary transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-soft"
              >
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Trusted by students from 100+ institutions</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-xs font-semibold tracking-wider">PRIVACY FIRST</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="text-xs font-semibold tracking-wider">PEER REVIEWED</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="text-xs font-semibold tracking-wider">24/7 SUPPORT</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;