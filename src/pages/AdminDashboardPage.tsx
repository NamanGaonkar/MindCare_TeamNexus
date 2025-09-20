import AdminDashboard from "@/components/AdminDashboard";
import Header from "@/components/Header";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminDashboardPage;
