
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNavLinks = [
    { to: "/admin/analytics", label: "Analytics Dashboard" },
    { to: "/admin/users", label: "User Management" },
    { to: "/admin/content", label: "Content & Community" },
    { to: "/admin/settings", label: "System Settings" },
];

const AdminDashboardTabs = () => {
  return (
    <nav className="grid grid-cols-4 rounded-lg bg-muted p-1">
      {adminNavLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "transition-all duration-200",
            isActive 
              ? "bg-background text-primary shadow-sm"
              : "hover:bg-background/50",
            "font-medium"
          )}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default AdminDashboardTabs;
