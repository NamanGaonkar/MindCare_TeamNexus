
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
import { Bot, BookOpen, Users, MessageSquare } from "lucide-react";

const AdminSystemSettings = () => {
  const counselors = [
    { id: 1, name: "Dr. Sarah Johnson", isAvailable: true },
    { id: 2, name: "Dr. Michael Chen", isAvailable: true },
    { id: 3, name: "Dr. Emily Rodriguez", isAvailable: false },
  ];

  return (
    <div className="space-y-8">
      <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Manage global system configurations.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
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

          {/* Counselor Availability Settings */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center"><Users className="mr-2"/>Counselor Availability</CardTitle>
                  <CardDescription>Control which counselors can receive bookings from students.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-3">
                        <Label htmlFor={`counselor-${counselor.id}`} className="flex flex-col space-y-1">
                            <span>{counselor.name}</span>
                            <span className="font-normal text-sm text-muted-foreground">
                            {counselor.isAvailable ? 'Currently accepting bookings' : 'Not accepting bookings'}
                            </span>
                        </Label>
                        <Switch id={`counselor-${counselor.id}`} defaultChecked={counselor.isAvailable} />
                    </div>
                  ))}
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                  <Button>Save Availability Settings</Button>
              </CardFooter>
          </Card>

          {/* Community Management */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center"><MessageSquare className="mr-2"/>Community Management</CardTitle>
                  <CardDescription>Control community features and moderation settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-3">
                      <Label htmlFor="community-enabled" className="flex flex-col space-y-1">
                          <span>Community Forum Enabled</span>
                          <span className="font-normal text-sm text-muted-foreground">
                          Allow students to access the community forum.
                          </span>
                      </Label>
                      <Switch id="community-enabled" defaultChecked />
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-3">
                      <Label htmlFor="auto-moderation" className="flex flex-col space-y-1">
                          <span>Auto-Moderation</span>
                          <span className="font-normal text-sm text-muted-foreground">
                          Automatically moderate posts for inappropriate content.
                          </span>
                      </Label>
                      <Switch id="auto-moderation" defaultChecked />
                  </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                  <Button>Save Community Settings</Button>
              </CardFooter>
          </Card>
      </div>
    </div>
  );
};

export default AdminSystemSettings;
