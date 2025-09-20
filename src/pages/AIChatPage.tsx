import AIChat from "@/components/AIChat";
import Header from "@/components/Header";

const AIChatPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AIChat />
      </main>
    </div>
  );
};

export default AIChatPage;
