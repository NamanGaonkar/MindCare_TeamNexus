import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AIChat from "@/components/AIChat";
import BookingSystem from "@/components/BookingSystem";
import ResourceHub from "@/components/ResourceHub";
import Community from "@/components/Community";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AIChat />
        <BookingSystem />
        <ResourceHub />
        <Community />
        <AdminDashboard />
      </main>
    </div>
  );
};

export default Index;
