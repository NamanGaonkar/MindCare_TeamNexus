import { Button } from "@/components/ui/button";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    "Support": [
      { name: "AI Chat Support", href: "#ai-chat" },
      { name: "Book Counselor", href: "#booking" },
      { name: "Crisis Resources", href: "#crisis" },
      { name: "FAQ", href: "#faq" },
    ],
    "Resources": [
      { name: "Mental Health Guides", href: "#resources" },
      { name: "Relaxation Audio", href: "#audio" },
      { name: "Educational Videos", href: "#videos" },
      { name: "Wellness Blog", href: "#blog" },
    ],
    "Community": [
      { name: "Peer Support Forum", href: "#community" },
      { name: "Success Stories", href: "#stories" },
      { name: "Volunteer", href: "#volunteer" },
      { name: "Guidelines", href: "#guidelines" },
    ],
    "Institution": [
      { name: "For Administrators", href: "#admin" },
      { name: "Implementation Guide", href: "#guide" },
      { name: "Training Materials", href: "#training" },
      { name: "Contact Us", href: "#contact" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Heart className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MindCare
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              A comprehensive digital mental health support system designed specifically for college students. 
              Breaking stigma, building community, and providing accessible mental health resources.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Crisis Hotline: 988</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@mindcare.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available at 100+ institutions</span>
              </div>
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
              
              {/* Emergency Banner */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-destructive/10 rounded-full">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-destructive">24/7 Crisis Support Available</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#accessibility" className="hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2024 MindCare. A hackathon project for digital mental health intervention.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>System Status: All services operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            <strong className="text-warning">Important:</strong> MindCare is designed to complement, not replace, 
            professional mental health services. If you're experiencing a mental health crisis, please contact 
            emergency services or a crisis hotline immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;