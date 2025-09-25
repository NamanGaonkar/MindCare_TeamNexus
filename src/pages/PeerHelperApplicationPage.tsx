import PeerHelperApplicationConnected from "@/components/PeerHelperApplicationConnected";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

const PeerHelperApplicationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PeerHelperApplicationConnected />
      </main>
    </div>
  );
};

export default PeerHelperApplicationPage;
