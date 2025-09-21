
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
  BarChart3,
  Download,
  Filter
} from "lucide-react";

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


const AdminAnalyticsDashboard = () => {
  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold">Analytics Overview</h2>
                <p className="text-muted-foreground">Anonymous data insights for strategic mental health interventions.</p>
            </div>
            <div className="flex w-full sm:w-auto space-x-3">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filter Data
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
            <Card key={index}>
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
            <div className="lg:col-span-2">
              <Card>
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
                  </div>
                  ))}
              </CardContent>
              </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Usage Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="font-semibold">Peak Hours: 10 PM - 2 AM</p>
                            <p className="text-sm mt-1">68% of AI interactions occur during these hours.</p>
                        </div>
                    </CradContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default AdminAnalyticsDashboard;
