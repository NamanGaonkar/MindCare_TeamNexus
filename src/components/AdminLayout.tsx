import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const adminNavItems = [
    { name: "Analytics", href: "/admin/analytics" },
    { name: "User Management", href: "/admin/users" },
    { name: "Content & Community", href: "/admin/content" },
    { name: "System Settings", href: "/admin/settings" },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/ai-chat" replace />;
  }

  const activeTabValue = adminNavItems.find(item => location.pathname.startsWith(item.href))?.href;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Admin Control Panel
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Central hub for managing users, content, and system analytics.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome, {user.email}
          </p>
        </div>
        <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTabValue} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {adminNavItems.map((item) => (
            <TabsTrigger value={item.href} asChild key={item.href}>
              <Link to={item.href}>{item.name}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;