
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Flag, Check, MessageSquare, BookOpen } from "lucide-react";

const communityPosts = [
  {
    id: "POST-101",
    title: "Feeling overwhelmed with coursework",
    author: "StressedStudent23",
    category: "Academic Stress",
    reports: 3,
    status: "Pending Review",
    postedAt: "2 hours ago",
  },
  {
    id: "POST-102",
    title: "Is anyone else feeling really lonely?",
    author: "LonelyFreshman",
    category: "Social Connection",
    reports: 1,
    status: "Pending Review",
    postedAt: "5 hours ago",
  },
  {
    id: "POST-103",
    title: "Tips for getting better sleep",
    author: "SleepyHead",
    category: "Sleep & Wellness",
    reports: 0,
    status: "Approved",
    postedAt: "1 day ago",
  },
];

const resourceArticles = [
    {
        id: "RES-024",
        title: "Introduction to Mindfulness Meditation",
        category: "Wellness Techniques",
        status: "Published",
        lastUpdated: "2024-07-20",
    },
    {
        id: "RES-025",
        title: "How to beat procrastination",
        category: "Academic Skills",
        status: "Draft",
        lastUpdated: "2024-07-28",
    }
]

const getStatusBadgeVariant = (status:string) => {
    if(status === "Pending Review") return "warning";
    if(status === "Approved" || status === "Published") return "success";
    return "secondary";
}

const AdminContentManagement = () => {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2"/>Community Moderation</CardTitle>
                    <p className="text-sm text-muted-foreground">Review, approve, or remove community posts and comments.</p>
                </div>
                <Button variant="secondary">View All Posts</Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Post ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {communityPosts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-mono text-xs">{post.id}</TableCell>
                            <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                            <TableCell className="text-muted-foreground">{post.author}</TableCell>
                            <TableCell>
                                <Badge variant={post.reports > 0 ? "destructive" : "outline"}>{post.reports} reports</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadgeVariant(post.status) as any}>{post.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                                Review Post
                            </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle className="flex items-center"><BookOpen className="h-5 w-5 mr-2"/>Resource Hub Management</CardTitle>
                    <p className="text-sm text-muted-foreground">Create, edit, and publish articles and resources.</p>
                </div>
                <Button variant="secondary">Add New Resource</Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Resource ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resourceArticles.map((res) => (
                        <TableRow key={res.id}>
                            <TableCell className="font-mono text-xs">{res.id}</TableCell>
                            <TableCell className="font-medium">{res.title}</TableCell>
                             <TableCell className="text-muted-foreground">{res.category}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadgeVariant(res.status) as any}>{res.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                                Edit Resource
                            </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
};

export default AdminContentManagement;
