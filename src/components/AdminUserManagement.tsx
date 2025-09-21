
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus } from "lucide-react";

const users = [
  {
    id: "USR-001",
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    role: "Student",
    status: "Active",
    lastLogin: "2024-07-29 10:30 AM",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Student",
    status: "Active",
    lastLogin: "2024-07-29 11:15 AM",
  },
  {
    id: "USR-003",
    name: "Amit Singh",
    email: "amit.singh@example.com",
    role: "Peer Helper",
    status: "Inactive",
    lastLogin: "2024-07-28 05:00 PM",
  },
    {
    id: "USR-004",
    name: "Dr. Anjali Mehta",
    email: "anjali.mehta@example.com",
    role: "Counselor",
    status: "Active",
    lastLogin: "2024-07-29 09:05 AM",
  },
];

const getStatusBadgeVariant = (status:string) => {
  if (status === "Active") return "success";
  if (status === "Inactive") return "secondary";
  return "default";
};

const getRoleBadgeVariant = (role:string) => {
  if (role === "Counselor") return "primary";
  if (role === "Peer Helper") return "accent";
  return "secondary";
};

const AdminUserManagement = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>User Management</CardTitle>
            <p className="text-sm text-muted-foreground">View, search, and manage all users in the system.</p>
        </div>
        <div className="flex space-x-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-8 w-64" />
            </div>
            <Button><UserPlus className="h-4 w-4 mr-2" />Add New User</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-xs">{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role) as any}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.status) as any}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View Details
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

export default AdminUserManagement;
