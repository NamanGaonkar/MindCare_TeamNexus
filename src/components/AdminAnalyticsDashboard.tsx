
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, Siren } from "lucide-react";

const analyticsData = [
  {
    title: "Total Active Users",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Daily Forum Posts",
    value: "43",
    change: "+8%",
    changeType: "positive",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Counseling Sessions",
    value: "89",
    change: "+15%",
    changeType: "positive",
icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Crisis Interventions",
    value: "3",
    change: "-25%",
    changeType: "negative",
    icon: <Siren className="h-4 w-4 text-muted-foreground" />,
  },
];

const AdminAnalyticsDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          An overview of platform engagement and user activity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p
                className={`text-xs ${
                  item.changeType === "positive" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;
