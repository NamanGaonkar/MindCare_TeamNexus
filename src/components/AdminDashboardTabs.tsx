
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAnalyticsDashboard from "./AdminAnalyticsDashboard";
import AdminUserManagement from "./AdminUserManagement";
import AdminContentManagement from "./AdminContentManagement";
import AdminSystemSettings from "./AdminSystemSettings";

const AdminDashboardTabs = () => {
  return (
    <Tabs defaultValue="analytics" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="content">Content & Community</TabsTrigger>
        <TabsTrigger value="settings">System Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="analytics" className="py-6">
        <AdminAnalyticsDashboard />
      </TabsContent>
      <TabsContent value="users" className="py-6">
        <AdminUserManagement />
      </TabsContent>
      <TabsContent value="content" className="py-6">
        <AdminContentManagement />
      </TabsContent>
      <TabsContent value="settings" className="py-6">
        <AdminSystemSettings />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardTabs;
