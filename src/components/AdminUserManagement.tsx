
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search } from "lucide-react";

const users = [
  {
    id: "USR-001",
    name: "Alex Doe",
    email: "alex.doe@university.edu",
    role: "Student",
    status: "Active",
    lastLogin: "2024-07-28 10:30 AM",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    role: "Student",
    status: "Active",
    lastLogin: "2024-07-28 09:15 AM",
  },
  {
    id: "ADM-001",
    name: "Dr. Emily White",
    email: "emily.white@university.edu",
    role: "Counselor",
    status: "Active",
    lastLogin: "2024-07-28 08:55 AM",
  },
  {
    id: "SADM-001",
    name: "Super Admin",
    email: "super@university.edu",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-07-29 11:00 AM",
  },
];

const getRoleBadgeVariant = (role:string) => {
    if(role === "Super Admin") return "destructive";
    if(role === "Counselor") return "secondary";
    return "outline";
}

const getStatusBadgeVariant = (status:string) => {
    if(status === "Active") return "success";
    return "secondary";

}

const AdminUserManagement = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <CardTitle>User Directory</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Manage all users, roles, and permissions.</p>
        </div>
        <Button className="w-full md:w-auto">
            <UserPlus className="h-4 w-4 mr-2"/>
            Add New User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input placeholder="Search by name, email, or role..." className="pl-10"/>
            </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-4">
            {users.map((user) => (
                <Card key={user.id} className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs font-mono text-muted-foreground mt-1">{user.id}</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <Badge variant={getRoleBadgeVariant(user.role) as any}>{user.role}</Badge>
                        <Badge variant={getStatusBadgeVariant(user.status) as any}>{user.status}</Badge>
                    </div>
                </Card>
            ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block border rounded-lg">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
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
                    <TableCell className="text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserManagement;
