import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Bot, 
  BookOpen, 
  Activity,
  AlertTriangle,
  Shield
} from "lucide-react";

const AdminControlOverview = () => {
  const studentFeatures = [
    {
      feature: "Community Forum",
      icon: MessageSquare,
      status: "enabled",
      activeUsers: 247,
      description: "Student peer support community",
      adminControls: ["Enable/Disable Forum", "Moderate Posts", "Manage Guidelines"]
    },
    {
      feature: "AI Chat Assistant",
      icon: Bot,
      status: "enabled", 
      activeUsers: 89,
      description: "24/7 AI mental health support",
      adminControls: ["Enable/Disable AI", "Set Crisis Keywords", "Configure Responses"]
    },
    {
      feature: "Counselor Booking",
      icon: Calendar,
      status: "enabled",
      activeUsers: 156,
      description: "Book appointments with counselors",
      adminControls: ["Manage Counselor Availability", "Set Booking Rules", "View Statistics"]
    },
    {
      feature: "Resource Hub",
      icon: BookOpen,
      status: "enabled",
      activeUsers: 324,
      description: "Mental wellness video resources",
      adminControls: ["Curate Videos", "Add New Resources", "Monitor Usage"]
    }
  ];

  const systemMetrics = [
    { label: "Total Active Users", value: "1,247", trend: "+12%", icon: Users },
    { label: "Daily Forum Posts", value: "43", trend: "+8%", icon: MessageSquare },
    { label: "Counseling Sessions", value: "89", trend: "+15%", icon: Calendar },
    { label: "Crisis Interventions", value: "3", trend: "-25%", icon: AlertTriangle }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Administrative Control Panel</h2>
        <p className="text-muted-foreground">
          Complete oversight and control over all student-facing features and services.
        </p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <metric.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <Badge variant={metric.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Control Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {studentFeatures.map((feature, index) => (
          <Card key={index} className="shadow-soft border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{feature.feature}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={feature.status === 'enabled' ? 'default' : 'secondary'}>
                    {feature.status}
                  </Badge>
                  <Switch defaultChecked={feature.status === 'enabled'} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Active Users</span>
                </div>
                <span className="font-bold">{feature.activeUsers}</span>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Administrative Controls
                </Label>
                <div className="space-y-1">
                  {feature.adminControls.map((control, controlIndex) => (
                    <div key={controlIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{control}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Configure
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Monitor
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Authority Notice */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Complete Administrative Authority</h3>
              <p className="text-sm text-muted-foreground mb-4">
                As an administrator, you have full control over all student-facing features. You can:
              </p>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Enable or disable any feature instantly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Monitor all user activity and engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Configure system-wide settings and policies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Manage crisis intervention protocols</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControlOverview;