import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Loader2, Flag, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  is_pinned: boolean;
  likes_count: number;
  replies_count: number;
  created_at: string;
  user_id: string;
}

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  type: string | null;
  is_featured: boolean;
  created_at: string;
}

const AdminContentManagement = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'resources'>('posts');

  const fetchPosts = async () => {
    try {
      // Get posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        toast.error('Failed to load posts');
        return;
      }

      // Get author names
      if (postsData && postsData.length > 0) {
        const userIds = [...new Set(postsData.map(post => post.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', userIds);

        const profileMap = profilesData?.reduce((acc, profile) => {
          acc[profile.user_id] = profile.full_name;
          return acc;
        }, {} as Record<string, string>) || {};

        const formattedPosts = postsData.map(post => ({
          ...post,
          author_name: profileMap[post.user_id] || `User ${post.user_id.slice(0, 8)}`
        }));

        setPosts(formattedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    }
  };

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        toast.error('Failed to load resources');
        return;
      }

      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPosts(), fetchResources()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getPostStatusBadge = (post: CommunityPost) => {
    if (post.is_pinned) return <Badge variant="secondary">Pinned</Badge>;
    if (post.replies_count > 10) return <Badge variant="outline">Popular</Badge>;
    return <Badge variant="outline">Active</Badge>;
  };

  const getResourceStatusBadge = (resource: Resource) => {
    if (resource.is_featured) return <Badge variant="secondary">Featured</Badge>;
    return <Badge variant="outline">Published</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">
          Monitor community posts and manage educational resources
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{posts.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{posts.filter(p => p.is_pinned).length}</div>
            <p className="text-xs text-muted-foreground">Pinned Posts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">Resources</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{resources.filter(r => r.is_featured).length}</div>
            <p className="text-xs text-muted-foreground">Featured Resources</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'posts' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('posts')}
        >
          Community Posts
        </Button>
        <Button
          variant={activeTab === 'resources' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </Button>
      </div>

      {/* Content Tables */}
      {activeTab === 'posts' && (
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Community Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{post.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                      </div>
                    </TableCell>
                    <TableCell>{post.author_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{post.likes_count} likes</div>
                        <div>{post.replies_count} replies</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPostStatusBadge(post)}</TableCell>
                    <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Flag className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {posts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No community posts found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'resources' && (
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Educational Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{resource.title}</div>
                      {resource.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {resource.description.length > 100 ? `${resource.description.substring(0, 100)}...` : resource.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.category}</Badge>
                    </TableCell>
                    <TableCell>{resource.type || 'Article'}</TableCell>
                    <TableCell>{getResourceStatusBadge(resource)}</TableCell>
                    <TableCell>{new Date(resource.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {resources.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No resources found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminContentManagement;