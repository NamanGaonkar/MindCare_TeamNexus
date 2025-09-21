
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAnalytics from "./AdminAnalytics";
import AdminUserManagement from "./AdminUserManagement";
import AdminContentManagement from "./AdminContentManagement";
import AdminSystemSettings from "./AdminSystemSettings"; // Placeholder for a future component

const AdminDashboardTabs = () => {
  return (
    <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Admin Control Panel</h1>
                <p className="text-muted-foreground mb-8">Central hub for managing users, content, and system analytics.</p>

                <Tabs defaultValue="analytics" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
                        <TabsTrigger value="users">User Management</TabsTrigger>
                        <TabsTrigger value="content">Content & Community</TabsTrigger>
                        <TabsTrigger value="settings">System Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="analytics">
                        <AdminAnalytics />
                    </TabsContent>
                    <TabsContent value="users">
                        <AdminUserManagement />
                    </TabsContent>
                    <TabsContent value="content">
                        <AdminContentManagement />
                    </TabsContent>
                    <TabsContent value="settings">
                        <AdminSystemSettings />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboardTabs;
