
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

const communityPosts = [
  {
    id: "POST-021",
    author: "Student2024",
    content: "Feeling really overwhelmed with final exams. Anyone have tips for managing stress? It's hard to focus on studying...",
    status: "Active",
    flags: 0,
    date: "2024-07-28 14:10 PM",
  },
  {
    id: "POST-022",
    author: "AnonymousUser",
    content: "This content has been flagged for review due to a potential violation of community guidelines (e.g. self-harm talk).",
    status: "Flagged",
    flags: 3,
    date: "2024-07-28 18:45 PM",
  },
  {
    id: "RSC-005",
    author: "CounselingCenter",
    content: "New Article: '5 Mindfulness Exercises to Find Calm During Chaos' has been published.",
    status: "Published",
    flags: 0,
    date: "2024-07-27 11:00 AM",
  },
];

const getStatusBadgeVariant = (status:string) => {
    if(status === "Flagged") return "destructive";
    if(status === "Published") return "success";
    return "secondary";
}

const AdminContentManagement = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Content & Community</CardTitle>
            <p className="text-sm text-muted-foreground">Monitor community posts and manage educational resources.</p>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Content ID</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="w-[50%]">Content Snippet</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Flags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {communityPosts.map((post) => (
                <TableRow key={post.id}>
                    <TableCell className="font-mono text-xs">{post.id}</TableCell>
                    <TableCell className="font-medium">{post.author}</TableCell>
                    <TableCell className="text-muted-foreground text-xs truncate max-w-sm">{post.content}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusBadgeVariant(post.status) as any}>{post.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">{post.flags > 0 ? post.flags : '-'}</TableCell>
                    <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
};

export default AdminContentManagement;
