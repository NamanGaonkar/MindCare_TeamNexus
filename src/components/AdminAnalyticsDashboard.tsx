import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, Siren, TrendingUp, Activity, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AnalyticsData {
  totalUsers: number;
  totalPosts: number;
  totalBookings: number;
  totalReplies: number;
}

const AdminAnalyticsDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalPosts: 0,
    totalBookings: 0,
    totalReplies: 0
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  if (!authLoading && (!user || user.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Get total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total posts
      const { count: postCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

      // Get total bookings
      const { count: bookingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      // Get total replies
      const { count: replyCount } = await supabase
        .from('post_replies')
        .select('*', { count: 'exact', head: true });

      setAnalytics({
        totalUsers: userCount || 0,
        totalPosts: postCount || 0,
        totalBookings: bookingCount || 0,
        totalReplies: replyCount || 0
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') {
      fetchAnalytics();
    }
  }, [user, authLoading]);

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
      uptime: "99.8%",
      color: "text-green-600"
    },
    {
      title: "User Authentication",
      status: "Operational",
      uptime: "100%",
      color: "text-green-600"
    },
    {
      title: "Community Forum",
      status: "Operational",
      uptime: "99.7%",
      color: "text-green-600"
    },
  ];

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const analyticsCards = [
    {
      title: "Total Active Users",
      value: analytics.totalUsers.toLocaleString(),
      change: "+12%",
      changeType: "positive",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: "Students actively using the platform"
    },
    {
      title: "Forum Posts",
      value: analytics.totalPosts.toLocaleString(),
      change: "+8%",
      changeType: "positive",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
      description: "Total community discussions"
    },
    {
      title: "Counseling Sessions",
      value: analytics.totalBookings.toLocaleString(),
      change: "+15%",
      changeType: "positive",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      description: "Total booked sessions"
    },
    {
      title: "Community Replies",
      value: analytics.totalReplies.toLocaleString(),
      change: "+20%",
      changeType: "positive",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      description: "Total community replies"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor platform usage and system performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((metric, index) => (
          <Card key={index} className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
              <p className="text-xs text-muted-foreground">
                <span className={`inline-flex items-center ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </span>
                {' from last month'}
              </p>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealth.map((system, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold">{system.title}</h3>
                <div className={`text-sm ${system.color}`}>
                  {system.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  {system.uptime} uptime
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Platform Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Daily Active Users</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Forum Engagement</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>AI Chat Usage</span>
                  <span>91%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Support Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Average Response Time</span>
                <span className="font-semibold">&lt; 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">User Satisfaction</span>
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Crisis Interventions</span>
                <span className="font-semibold">3 this week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Session Completion Rate</span>
                <span className="font-semibold">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;