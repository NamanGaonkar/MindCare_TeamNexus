
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "Analytics", href: "/admin/analytics" },
  { name: "User Management", href: "/admin/users" },
  { name: "Content & Community", href: "/admin/content" },
  { name: "System Settings", href: "/admin/settings" },
];

const AdminDashboardTabs = () => {
  return (
    <div className="grid w-full grid-cols-4 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {adminNavItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "w-full",
              isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50"
            )
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default AdminDashboardTabs;
