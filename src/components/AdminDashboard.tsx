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
  Filter
} from "lucide-react";

const AdminDashboard = () => {
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
      color: "destructive",
    },
    {
      category: "Academic Pressure",
      percentage: 32,
      count: 910,
      trend: "+2%",
      color: "warning",
    },
    {
      category: "Social Issues",
      percentage: 28,
      count: 798,
      trend: "-3%",
      color: "primary",
    },
    {
      category: "Sleep Problems",
      percentage: 25,
      count: 712,
      trend: "+8%",
      color: "accent",
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

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                📊 Administrative Dashboard
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Mental Health Analytics
              </h2>
              <p className="text-muted-foreground">
                Anonymous data insights for strategic mental health interventions
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Data
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
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
            {/* Main Analytics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wellness Trends */}
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

              {/* Usage Patterns */}
              <Card className="shadow-soft border-border/50">
                <CardHeader>
                  <CardTitle>Peak Usage Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Interactive usage chart would be displayed here</p>
                    <p className="text-sm mt-2">Peak hours: 10 PM - 2 AM (68% of interactions)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts */}
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

              {/* Quick Actions */}
              <Card className="shadow-soft border-border/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Students
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Counselor Schedules
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Community Moderation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy Notice */}
              <Card className="bg-primary/5 border-primary/20 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-primary text-sm">Data Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    All data shown is anonymized and aggregated. Individual student information 
                    is never displayed to maintain complete confidentiality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Notice */}
          <Card className="mt-8 bg-secondary/5 border-secondary/20">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold text-secondary mb-2">
                🎯 Strategic Mental Health Planning
              </h4>
              <p className="text-sm text-muted-foreground">
                Use these insights to identify trends, allocate resources effectively, and plan targeted 
                mental health interventions for your institution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;