import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <footer className="text-center p-8 text-muted-foreground bg-card/50 backdrop-blur-sm border-t border-border/50">
        <p className="text-sm">
          <span className="font-medium text-primary">MindCare</span> - A project by TEAM NEXUS
        </p>
      </footer>
    </div>
  );
};

export default Index;
