import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, Siren, TrendingUp, Activity } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const analyticsData = [
  {
    title: "Total Active Users",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    description: "Students actively using the platform"
  },
  {
    title: "Daily Forum Posts",
    value: "43",
    change: "+8%",
    changeType: "positive",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    description: "New community discussions today"
  },
  {
    title: "Counseling Sessions",
    value: "89",
    change: "+15%",
    changeType: "positive",
    icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    description: "Booked sessions this week"
  },
  {
    title: "Crisis Interventions",
    value: "3",
    change: "-25%",
    changeType: "negative",
    icon: <Siren className="h-4 w-4 text-muted-foreground" />,
    description: "AI-detected crisis situations"
  },
];

const systemHealth = [
  {
    title: "AI Chat System",
    status: "Operational",
    uptime: "99.9%",
    color: "text-green-600"
  },
  {
    title: "Database",
    status: "Operational", 
    uptime: "100%",
    color: "text-green-600"
  },
  {
    title: "Community Forum",
    status: "Operational",
    uptime: "99.8%",
    color: "text-green-600"
  },
  {
    title: "Booking System",
    status: "Operational",
    uptime: "99.9%",
    color: "text-green-600"
  }
];

const AdminAnalyticsDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/ai-chat" replace />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Real-time overview of platform engagement and user activity.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item) => (
          <Card key={item.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p
                className={`text-xs flex items-center mt-1 ${
                  item.changeType === "positive" ? "text-green-500" : "text-red-500"
                }`}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                {item.change} from last month
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            System Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemHealth.map((system) => (
              <div key={system.title} className="flex flex-col space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{system.title}</span>
                  <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
                </div>
                <div className={`text-sm font-medium ${system.color}`}>
                  {system.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Uptime: {system.uptime}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>New user registrations today</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>AI chat sessions started</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Community posts created</span>
                <span className="font-medium">43</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Counseling sessions booked</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Peak usage time</span>
                <span className="font-medium">2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Most active feature</span>
                <span className="font-medium">AI Chat Support</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Average session duration</span>
                <span className="font-medium">12 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>User satisfaction rate</span>
                <span className="font-medium text-green-600">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;