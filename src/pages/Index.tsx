import Header from "@/components/Header";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
      <footer className="text-center p-8 text-muted-foreground bg-card/50 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm">
            <span className="font-medium text-primary">MindCare</span> - Therapeutic digital intervention for student mental health
          </p>
          <p className="text-xs mt-2 opacity-75">
            Project by Team Nexus | Confidential & HIPAA Compliant | 24/7 Crisis Support Available
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
