
import { Outlet } from "react-router-dom";
import AdminDashboardTabs from "./AdminDashboardTabs";

const AdminDashboard = () => {
  return (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">Admin Control Panel</h1>
                    <p className="text-lg text-muted-foreground">Central hub for managing users, content, and system analytics.</p>
                </div>
                <AdminDashboardTabs />
                <main className="py-6">
                    <Outlet />
                </main>
            </div>
        </div>
    </section>
  )
};

export default AdminDashboard;
