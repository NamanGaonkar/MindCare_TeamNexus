
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-50">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-slate-800"
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700 space-y-4">
        <Button
            variant="outline"
            className="w-full bg-transparent text-slate-50 hover:bg-slate-800 hover:text-white"
            onClick={() => navigate("/")}
        >
            <Home className="w-5 h-5 mr-2" />
            Back to Site
        </Button>
        <Button
          variant="destructive"
          className="w-full bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600/30 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar content */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-slate-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="fixed top-0 left-0 w-64 h-full">
            <SidebarContent />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-0 md:ml-64">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden mb-6">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu />
            </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
