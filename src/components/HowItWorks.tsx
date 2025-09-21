
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CalendarCheck2, Users, ShieldCheck } from "lucide-react";

const guideSteps = [
  {
    icon: MessageSquare,
    title: "Chat with Your AI Companion",
    description: "Start a conversation anytime. Your AI is trained to listen, provide support, and offer evidence-based techniques to help you navigate your feelings.",
  },
  {
    icon: CalendarCheck2,
    title: "Book a Session with a Counselor",
    description: "When you need more support, easily browse and book a confidential session with a licensed university counselor directly through the app.",
  },
  {
    icon: Users,
    title: "Connect with the Community",
    description: "Share your thoughts and connect with fellow students in a safe, anonymous space. Give and receive support from peers who understand.",
  },
  {
    icon: ShieldCheck,
    title: "Apply to Be a Peer Helper",
    description: "Make a difference by becoming a trained peer helper. Support others, gain valuable skills, and help build a stronger, healthier community.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A simple, confidential, and supportive journey to mental wellness. Here’s how you can get started.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {guideSteps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
