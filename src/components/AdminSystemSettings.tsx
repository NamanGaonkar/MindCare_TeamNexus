
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bell, Bot, BookOpen, LogOut } from "lucide-react";

const AdminSystemSettings = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold">System Settings</h2>
            <p className="text-muted-foreground">Manage global system configurations.</p>
        </div>
        <Button variant="destructive" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* AI Companion Settings */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center"><Bot className="mr-2"/>AI Companion Settings</CardTitle>
                  <CardDescription>Configure the behavior and crisis escalation protocols for the AI.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-3">
                      <Label htmlFor="ai-chat-enabled" className="flex flex-col space-y-1">
                          <span>AI Chat Enabled</span>
                          <span className="font-normal text-sm text-muted-foreground">
                          Globally enable or disable the AI chat feature.
                          </span>
                      </Label>
                      <Switch id="ai-chat-enabled" defaultChecked />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="crisis-keywords">Crisis Keywords</Label>
                      <Textarea 
                          id="crisis-keywords"
                          placeholder="suicide, self-harm, harm, abuse, assault, kill, helpless, worthless..."
                          defaultValue="suicide, self-harm, harm, abuse, assault, kill, helpless, worthless"
                          className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                          Keywords that will trigger immediate crisis escalation protocols.
                      </p>
                  </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                  <Button>Save AI Settings</Button>
              </CardFooter>
          </Card>

          {/* Counselor & Booking Settings */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center"><BookOpen className="mr-2"/>Counselor & Booking</CardTitle>
                  <CardDescription>Manage booking system parameters.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-3">
                      <Label htmlFor="online-booking-enabled" className="flex flex-col space-y-1">
                          <span>Online Booking Enabled</span>
                          <span className="font-normal text-sm text-muted-foreground">
                          Allow students to book appointments online.
                          </span>
                      </Label>
                      <Switch id="online-booking-enabled" defaultChecked />
                  </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                  <Button>Save Booking Settings</Button>
              </CardFooter>
          </Card>
      </div>
    </div>
  );
};

export default AdminSystemSettings;
