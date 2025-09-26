import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface User {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  role: 'student' | 'admin';
  institute: string | null;
  roll_number: string | null;
  created_at: string;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
        return;
      }

      setUsers((data || []).map(user => ({
        ...user,
        role: user.role as 'student' | 'admin'
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadgeVariant = (role: string) => {
    if (role === "admin") return "destructive";
    return "outline";
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage registered users and their access levels
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'student').length}</div>
            <p className="text-xs text-muted-foreground">Students</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
            <p className="text-xs text-muted-foreground">Admins</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{users.filter(u => new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</div>
            <p className="text-xs text-muted-foreground">New This Week</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Registered Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name || 'Anonymous User'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role === 'admin' ? 'Admin' : 'Student'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.institute || 'Not specified'}</TableCell>
                  <TableCell>{user.roll_number || 'Not specified'}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;