import Header from "@/components/Header";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
      </main>
      <footer className="text-center p-4 text-muted-foreground">
        Project by Team Nexus
      </footer>
    </div>
  );
};

export default Index;
