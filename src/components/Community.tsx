import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, Users, Clock, Pin, ThumbsUp, Reply, MoreHorizontal, HelpingHand, Send, Loader2, AlertCircle, RefreshCw } from "lucide-react";
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
  user_id: string;
}

interface PostReply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_name: string;
}

const Community = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [showNewPost, setShowNewPost] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<{ [postId: string]: PostReply[] }>({});
  const [loadingReplies, setLoadingReplies] = useState<{ [postId: string]: boolean }>({});
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });
  const [submittingPost, setSubmittingPost] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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

  const fetchReplies = async (postId: string) => {
    setLoadingReplies(prev => ({ ...prev, [postId]: true }));
    try {
      // First get replies
      const { data: repliesData, error: repliesError } = await supabase
        .from('post_replies')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (repliesError) {
        console.error('Error fetching replies:', repliesError);
        return;
      }

      // Then get author names for replies
      if (repliesData && repliesData.length > 0) {
        const userIds = [...new Set(repliesData.map(reply => reply.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, full_name')
          .in('user_id', userIds);

        const profileMap = profilesData?.reduce((acc, profile) => {
          acc[profile.user_id] = profile.full_name;
          return acc;
        }, {} as Record<string, string>) || {};

        const formattedReplies = repliesData.map(reply => ({
          ...reply,
          author_name: profileMap[reply.user_id] || `User ${reply.user_id.slice(0, 8)}`
        }));
        
        setReplies(prev => ({ ...prev, [postId]: formattedReplies }));
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setLoadingReplies(prev => ({ ...prev, [postId]: false }));
    }
  };

  const toggleReplies = (postId: string) => {
    if (!replies[postId]) {
      fetchReplies(postId);
    }
    setActiveReply(activeReply === postId ? null : postId);
  };

  const fetchPosts = useCallback(async (attempt: number = 1) => {
    try {
      setPostsError(null);
      setLoadingPosts(true);
      
      console.log(`Fetching posts (attempt ${attempt})`);
      
      // First get posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        throw new Error(`Failed to load posts: ${postsError.message}`);
      }

      // Then get author names
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
      } else {
        setPosts([]);
      }

      setRetryCount(0);
    } catch (error: any) {
      console.error('Error in fetchPosts:', error);
      setPostsError(error.message || 'Failed to load posts');
      
      const maxRetries = 3;
      if (attempt < maxRetries) {
        console.log(`Retrying... (${attempt + 1}/${maxRetries})`);
        setTimeout(() => fetchPosts(attempt + 1), 2000);
      }
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  const retryFetchPosts = () => {
    setRetryCount(prev => prev + 1);
    fetchPosts(1);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to create a post");
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmittingPost(true);

    try {
      const tags = newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);

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
      setReplyContent("");
      fetchReplies(postId); // Refresh replies for this post
      fetchPosts(); // Refresh posts to get updated counts
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error("Failed to post reply");
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) {
      toast.error("Please log in to like posts");
      return;
    }

    try {
      const currentPost = posts.find(p => p.id === postId);
      if (!currentPost) return;

      // Optimistically update the UI
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes_count: post.likes_count + 1 }
          : post
      ));

      const { error } = await supabase
        .from('posts')
        .update({ likes_count: currentPost.likes_count + 1 })
        .eq('id', postId);

      if (error) {
        console.error('Error liking post:', error);
        // Revert optimistic update
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count - 1 }
            : post
        ));
        toast.error("Failed to like post");
      } else {
        toast.success("Post liked!");
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error("Failed to like post");
    }
  };

  // Loading state for initial load
  if (authLoading || loadingPosts) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading community...</p>
        </div>
      </div>
    );
  }

  // Show error state for posts
  if (postsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md text-center bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">{postsError}</p>
            <Button onClick={retryFetchPosts} className="bg-gradient-primary hover:opacity-90">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
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
              <Card key={index} className="text-center border-border/50 bg-background/80 backdrop-blur-sm">
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

              {/* Connection Status Alert */}
              {postsError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>Connection issues: {postsError}</span>
                    <Button size="sm" variant="outline" onClick={retryFetchPosts}>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* New Post Form */}
              {showNewPost && user && (
                <Card className="mb-6 shadow-soft border-border/50 bg-background/80 backdrop-blur-sm">
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
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Textarea 
                        placeholder="Share your thoughts, ask questions, or offer support..." 
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        rows={4}
                        required
                      />
                      
                      <Input 
                        placeholder="Tags (comma-separated)" 
                        value={newPost.tags}
                        onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      />
                      
                      <Button 
                        type="submit" 
                        disabled={submittingPost}
                        className="w-full bg-gradient-primary hover:opacity-90"
                      >
                        {submittingPost ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Posting...
                          </>
                        ) : (
                          'Post Discussion'
                        )}
                      </Button>
                    </CardContent>
                  </form>
                </Card>
              )}

              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="shadow-soft border-border/50 bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {post.is_pinned && <Pin className="h-4 w-4 text-primary" />}
                          <Badge className={categoryColors[post.category] || "bg-gray-100 text-gray-800 border-gray-200"}>
                            {post.category}
                          </Badge>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{post.author_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{post.author_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{post.content}</p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1"/>
                            {post.likes_count} Likes
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleReplies(post.id)}
                          >
                            <Reply className="h-4 w-4 mr-1"/>
                            {post.replies_count} Replies
                          </Button>
                        </div>
                      </div>

                      {/* Replies Section */}
                      {activeReply === post.id && (
                        <div className="mt-6 pt-6 border-t border-border/50">
                          {/* Existing Replies */}
                          {replies[post.id] && replies[post.id].length > 0 && (
                            <div className="space-y-4 mb-4">
                              {replies[post.id].map((reply) => (
                                <div key={reply.id} className="bg-muted/30 rounded-lg p-4">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs">{reply.author_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{reply.author_name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(reply.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm">{reply.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {loadingReplies[post.id] && (
                            <div className="text-center py-4">
                              <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                              <p className="text-sm text-muted-foreground mt-2">Loading replies...</p>
                            </div>
                          )}

                          {/* Reply Form */}
                          {user && (
                            <div className="flex items-center space-x-3">
                              <Input 
                                type="text"
                                placeholder="Write a reply..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleReplySubmit(post.id);
                                  }
                                }}
                              />
                              <Button 
                                size="icon" 
                                onClick={() => handleReplySubmit(post.id)}
                                disabled={!replyContent.trim()}
                                className="bg-gradient-primary hover:opacity-90"
                              >
                                <Send className="h-4 w-4"/>
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {posts.length === 0 && !loadingPosts && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No posts yet. Be the first to start a discussion!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guidelines */}
              <Card className="shadow-soft border-border/50 bg-background/80 backdrop-blur-sm">
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
              <Card className="shadow-soft border-border/50 bg-background/80 backdrop-blur-sm">
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
