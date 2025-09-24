import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Users, Clock, Pin, ThumbsUp, Reply, MoreHorizontal, HelpingHand, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  tags: string[];
  is_pinned: boolean;
  likes_count: number;
  replies_count: number;
  created_at: string;
}

const Community = () => {
  const { user, profile } = useAuth();
  const [showNewPost, setShowNewPost] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });
  const [submittingPost, setSubmittingPost] = useState(false);

  const forumStats = [
    { label: "Active Members", value: "2,847", icon: Users },
    { label: "Support Posts", value: posts.length.toString(), icon: MessageSquare },
    { label: "Peer Helpers", value: "89", icon: HelpingHand },
    { label: "Response Time", value: "< 2hr", icon: Clock },
  ];

  const categories = [
    "Academic Stress",
    "Social Connection", 
    "Sleep & Wellness",
    "Mental Health Support",
    "Success Stories"
  ];

  const categoryColors = {
    "Academic Stress": "bg-red-100 text-red-800 border-red-200",
    "Social Connection": "bg-blue-100 text-blue-800 border-blue-200",
    "Sleep & Wellness": "bg-green-100 text-green-800 border-green-200",
    "Success Stories": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Mental Health Support": "bg-purple-100 text-purple-800 border-purple-200",
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      setPostsError(null);
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setPostsError('Failed to load posts. Please try again.');
        toast.error("Failed to load posts");
        return;
      }

      const formattedPosts = data?.map(post => ({
        ...post,
        author_name: 'Anonymous User'
      })) || [];

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPostsError('Failed to load posts. Please try again.');
      toast.error("Failed to load posts");
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmittingPost(true);
    
    try {
      const tags = newPost.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          title: newPost.title.trim(),
          content: newPost.content.trim(),
          category: newPost.category,
          tags: tags
        });

      if (error) {
        console.error('Error creating post:', error);
        toast.error("Failed to create post");
        return;
      }

      toast.success("Post created successfully!");
      setNewPost({ title: "", content: "", category: "", tags: "" });
      setShowNewPost(false);
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Failed to create post");
    } finally {
      setSubmittingPost(false);
    }
  };

  const handleReplySubmit = async (postId: string) => {
    if (!user || !replyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      const { error } = await supabase
        .from('post_replies')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: replyContent.trim()
        });

      if (error) {
        console.error('Error creating reply:', error);
        toast.error("Failed to post reply");
        return;
      }

      // Update reply count
      const currentPost = posts.find(p => p.id === postId);
      if (currentPost) {
        const { error: updateError } = await supabase
          .from('posts')
          .update({ replies_count: currentPost.replies_count + 1 })
          .eq('id', postId);
        
        if (updateError) {
          console.error('Error updating reply count:', updateError);
        }
      }

      toast.success("Reply posted successfully!");
      setActiveReply(null);
      setReplyContent("");
      fetchPosts(); // Refresh posts to get updated counts
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error("Failed to post reply");
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loadingPosts) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show error state for posts
  if (postsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <p className="text-destructive">{postsError}</p>
            <Button onClick={() => fetchPosts()} className="mt-4">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section id="community" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-success/10 text-success border-success/20">
              🤝 Peer Support Community
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect with Fellow Students
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our moderated peer support forum where students share experiences, 
              offer support, and connect with trained student volunteers in a safe space.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {forumStats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 text-primary mx-auto mb-2`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Forum Posts */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Discussions</h3>
                {user && (
                  <Button 
                    onClick={() => setShowNewPost(!showNewPost)}
                    className="bg-gradient-wellness hover:opacity-90"
                  >
                    {showNewPost ? 'Cancel' : 'Start New Discussion'}
                  </Button>
                )}
              </div>

              {/* New Post Form */}
              {showNewPost && user && (
                <Card className="mb-6 shadow-soft border-border/50">
                  <CardHeader>
                    <CardTitle>Create a New Post</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleCreatePost}>
                    <CardContent className="space-y-4">
                      <Input 
                        placeholder="Post Title" 
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                      
                      <Select 
                        value={newPost.category}
                        onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input 
                        placeholder="Tags (comma separated)" 
                        value={newPost.tags}
                        onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      />

                      <Textarea 
                        placeholder="Share your thoughts... (Remember to be respectful and avoid sharing personal information)" 
                        rows={4}
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        required
                      />
                      
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setShowNewPost(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={submittingPost}>
                          {submittingPost ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
                        </Button>
                      </div>
                    </CardContent>
                  </form>
                </Card>
              )}

              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="shadow-soft border-border/50 hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {post.is_pinned && (
                            <Pin className="h-4 w-4 text-primary" />
                          )}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${categoryColors[post.category as keyof typeof categoryColors]}`}
                          >
                            {post.category}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <Link to={`/community/post/${post.id}`}>
                        <h4 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer transition-colors">
                          {post.title}
                        </h4>
                      </Link>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-primary/10">
                                {post.author_name?.charAt(0) || 'A'}
                              </AvatarFallback>
                            </Avatar>
                            <span>{post.author_name || 'Anonymous'}</span>
                          </div>
                          <span>•</span>
                          <span>{formatTimeAgo(post.created_at)}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes_count}
                          </Button>
                          {user && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => setActiveReply(activeReply === post.id ? null : post.id)}
                            >
                              <Reply className="h-4 w-4 mr-1" />
                              {post.replies_count}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {/* Reply input section */}
                      {activeReply === post.id && user && (
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <div className="flex items-center space-x-3">
                            <Input 
                              type="text"
                              placeholder="Write a reply..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <Button size="icon" onClick={() => handleReplySubmit(post.id)}>
                              <Send className="h-4 w-4"/>
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No posts yet. Be the first to start a discussion!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guidelines */}
              <Card className="shadow-soft border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Be respectful and kind to fellow students</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Share experiences, not personal details</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>No medical advice - seek professional help</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Report harmful content immediately</span>
                  </div>
                </CardContent>
              </Card>

              {/* Peer Helpers */}
              <Card className="shadow-soft border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Trained Peer Helpers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our community is supported by trained student volunteers who provide additional guidance and support.
                  </p>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm font-medium">12 helpers online now</span>
                  </div>
                  <Link to="/peer-helper-application" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Become a Peer Helper
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Crisis Resources */}
              <Card className="bg-destructive/5 border-destructive/20 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're experiencing a mental health crisis, please reach out for immediate professional support.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Crisis Hotline:</strong> 988
                    </div>
                    <div>
                      <strong>Campus Counseling:</strong> (555) 123-HELP
                    </div>
                    <div>
                      <strong>Emergency:</strong> 911
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;