
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Bot, Users } from "lucide-react";

const AdminSystemSettings = () => {
  return (
    <div className="space-y-8">
      {/* AI Companion Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Bot className="h-5 w-5 mr-2"/>AI Companion Settings</CardTitle>
          <p className="text-sm text-muted-foreground">Configure the behavior and crisis escalation protocols for the AI.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="ai-enabled" className="font-medium">AI Chat Enabled</Label>
              <p className="text-xs text-muted-foreground">Globally enable or disable the AI chat feature.</p>
            </div>
            <Switch id="ai-enabled" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="crisis-keywords">Crisis Keywords</Label>
            <Textarea 
              id="crisis-keywords"
              placeholder="Enter comma-separated keywords (e.g., suicide, self-harm, abuse)"
              defaultValue="suicide, self-harm, harm, abuse, assault, kill, helpless, worthless"
            />
            <p className="text-xs text-muted-foreground">Keywords that will trigger immediate crisis escalation protocols.</p>
          </div>
           <div className="flex justify-end">
            <Button>Save AI Settings</Button>
          </div>
        </CardContent>
      </Card>

      {/* Counselor & Booking Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Users className="h-5 w-5 mr-2"/>Counselor & Booking</CardTitle>
           <p className="text-sm text-muted-foreground">Manage counselor profiles and booking system parameters.</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label htmlFor="booking-enabled" className="font-medium">Online Booking Enabled</Label>
                    <p className="text-xs text-muted-foreground">Allow students to book appointments online.</p>
                </div>
                <Switch id="booking-enabled" defaultChecked />
            </div>
            <div className="space-y-2">
                <Label htmlFor="booking-hours">Available Booking Hours</Label>
                <Input id="booking-hours" defaultValue="9:00 AM - 5:00 PM, Monday - Friday" />
                <p className="text-xs text-muted-foreground">Define the time window when students can book sessions.</p>
            </div>
             <div className="flex justify-end">
                <Button>Save Booking Settings</Button>
            </div>
        </CardContent>
      </Card>
      
       {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Bell className="h-5 w-5 mr-2"/>Admin Notifications</CardTitle>
           <p className="text-sm text-muted-foreground">Configure who receives critical system alerts.</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="crisis-alert-emails">Crisis Alert Recipients</Label>
                <Input id="crisis-alert-emails" placeholder="admin1@example.com, admin2@example.com" defaultValue="counseling-head@university.edu, security@university.edu" />
                <p className="text-xs text-muted-foreground">Email addresses that will receive immediate notifications for high-risk alerts.</p>
            </div>
             <div className="flex justify-end">
                <Button>Save Notification Settings</Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminSystemSettings;
