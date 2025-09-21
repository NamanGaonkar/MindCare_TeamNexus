
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Download,
  Filter,
  Phone
} from "lucide-react";

const IndianHelplines = () => (
  <div className="mt-4">
    <h4 className="text-sm font-semibold mb-2">Mental Health Helplines (India)</h4>
    <ul className="space-y-2 text-xs text-muted-foreground">
      <li><strong>Vandrevala Foundation:</strong> 9999666555</li>
      <li><strong>KIRAN Helpline:</strong> 1800-599-0019</li>
      <li><strong>iCALL Helpline:</strong> 022-25521111</li>
    </ul>
  </div>
);

const keyMetrics = [
  {
    title: "Active Students",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "primary",
  },
  {
    title: "Sessions This Month",
    value: "1,234",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "secondary",
  },
  {
    title: "AI Interactions",
    value: "5,678",
    change: "+23%",
    trend: "up",
    icon: MessageSquare,
    color: "accent",
  },
  {
    title: "Crisis Interventions",
    value: "12",
    change: "-15%",
    trend: "down",
    icon: AlertTriangle,
    color: "warning",
  },
];

const wellnessInsights = [
  {
    category: "Anxiety & Stress",
    percentage: 45,
    count: 1280,
    trend: "+5%",
  },
  {
    category: "Academic Pressure",
    percentage: 32,
    count: 910,
    trend: "+2%",
  },
  {
    category: "Social Issues",
    percentage: 28,
    count: 798,
    trend: "-3%",
  },
  {
    category: "Sleep Problems",
    percentage: 25,
    count: 712,
    trend: "+8%",
  },
];

const recentAlerts = [
  {
    id: 1,
    type: "high-risk",
    message: "Student requires immediate counselor follow-up",
    time: "15 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "resource",
    message: "Low availability in evening counseling slots",
    time: "2 hours ago",
    status: "resolved",
  },
  {
    id: 3,
    type: "community",
    message: "Inappropriate content reported in peer forum",
    time: "4 hours ago",
    status: "resolved",
  },
];

const getAlertColor = (type: string) => {
  switch (type) {
    case "high-risk": return "destructive";
    case "resource": return "warning";
    case "community": return "primary";
    default: return "secondary";
  }
};


const AdminAnalytics = () => {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Mental Health Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">Anonymous data insights for strategic mental health interventions.</p>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filter</Button>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {keyMetrics.map((metric, index) => (
                <Card key={index} className="shadow-soft border-border/50">
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <metric.icon className={`h-8 w-8 text-${metric.color}`} />
                        <Badge 
                        variant={metric.trend === "up" ? "default" : "secondary"}
                        className="text-xs"
                        >
                        <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                        {metric.change}
                        </Badge>
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.title}</div>
                    </CardContent>
                </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6"> 
                    <Card className="shadow-soft border-border/50">
                        <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5" />
                            <span>Mental Health Trends</span>
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                        {wellnessInsights.map((insight, index) => (
                            <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{insight.category}</span>
                                <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">
                                    {insight.count} students
                                </span>
                                <Badge variant="outline" className="text-xs">
                                    {insight.trend}
                                </Badge>
                                </div>
                            </div>
                            <Progress 
                                value={insight.percentage} 
                                className="h-2"
                            />
                            <div className="text-xs text-muted-foreground mt-1">
                                {insight.percentage}% of total interactions
                            </div>
                            </div>
                        ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-soft border-border/50">
                        <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>System Alerts</span>
                            <Badge variant="destructive" className="text-xs">
                            1 Critical
                            </Badge>
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        {recentAlerts.map((alert) => (
                            <div key={alert.id} className="p-3 rounded-lg border border-border/50 bg-muted/20">
                            <div className="flex items-start justify-between mb-2">
                                <Badge 
                                variant={getAlertColor(alert.type) as any}
                                className="text-xs"
                                >
                                {alert.type}
                                </Badge>
                                {alert.status === "resolved" ? (
                                <CheckCircle className="h-4 w-4 text-success" />
                                ) : (
                                <Clock className="h-4 w-4 text-warning" />
                                )}
                            </div>
                            <p className="text-sm mb-2">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                            </div>
                        ))}
                        </CardContent>
                    </Card>

                    <Card className="shadow-soft border-border/50">
                        <CardHeader>
                        <CardTitle className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                            Helpline Quick Reference
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <IndianHelplines />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CardContent>
    </Card>
  );
};

export default AdminAnalytics;
