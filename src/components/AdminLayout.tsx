
import { Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const adminNavItems = [
  { name: "Analytics", href: "/admin/analytics" },
  { name: "User Management", href: "/admin/users" },
  { name: "Content & Community", href: "/admin/content" },
  { name: "System Settings", href: "/admin/settings" },
];

const AdminLayout = () => {
  const location = useLocation();

  const activeTabValue = adminNavItems.find(item => location.pathname.startsWith(item.href))?.href;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Admin Control Panel
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Central hub for managing users, content, and system analytics.
        </p>
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
