
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Users, Clock, Pin, ThumbsUp, Reply, MoreHorizontal, HelpingHand, Send } from "lucide-react";
import { Link } from "react-router-dom";

// Enhanced: Define a type for our Post for better state management
interface ForumPost {
  id: number;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
  replies: number;
  likes: number;
  isPinned: boolean;
  preview: string;
  tags: string[];
}

const Community = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Enhanced: State for active reply sections and their content
  const [activeReply, setActiveReply] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const forumStats = [
    { label: "Active Members", value: "2,847", icon: Users },
    { label: "Support Posts", value: "1,234", icon: MessageSquare },
    { label: "Peer Helpers", value: "89", icon: HelpingHand },
    { label: "Response Time", value: "< 2hr", icon: Clock },
  ];

  // Enhanced: Expanded list of posts for a more dynamic "Load More" experience
  const [allForumPosts, setAllForumPosts] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Managing exam anxiety - tips that actually work",
      author: "Anonymous Student",
      category: "Academic Stress",
      timeAgo: "2h ago",
      replies: 23,
      likes: 47,
      isPinned: true,
      preview: "Hey everyone, I wanted to share some techniques that really helped me during finals week...",
      tags: ["anxiety", "exams", "coping"],
    },
    {
      id: 2,
      title: "Feeling isolated in my dorm - anyone else?",
      author: "FirstYear_2024",
      category: "Social Connection",
      timeAgo: "4h ago",
      replies: 15,
      likes: 28,
      isPinned: false,
      preview: "I moved away from home for college and I'm struggling to make connections. The loneliness is really getting to me...",
      tags: ["loneliness", "social", "freshman"],
    },
    {
      id: 3,
      title: "Sleep schedule completely messed up",
      author: "NightOwl_Student",
      category: "Sleep & Wellness",
      timeAgo: "6h ago",
      replies: 31,
      likes: 42,
      isPinned: false,
      preview: "I've been staying up until 3-4 AM studying and my sleep is all over the place. How do you maintain a healthy sleep routine?",
      tags: ["sleep", "schedule", "health"],
    },
    {
      id: 4,
      title: "Starting therapy - what to expect?",
      author: "NewToTherapy",
      category: "Mental Health Support",
      timeAgo: "8h ago",
      replies: 18,
      likes: 35,
      isPinned: false,
      preview: "I've finally decided to start therapy but I'm nervous about the first session. Any advice?",
      tags: ["therapy", "first-time", "advice"],
    },
    {
      id: 5,
      title: "Coping with homesickness",
      author: "OutOfStateFreshman",
      category: "Social Connection",
      timeAgo: "12h ago",
      replies: 22,
      likes: 29,
      isPinned: false,
      preview: "Being 1000 miles from home is harder than I thought. Missing family and friends more than expected.",
      tags: ["homesickness", "family", "adjustment"],
    },
    {
      id: 6,
      title: "Study group success story",
      author: "GroupStudyFan",
      category: "Success Stories",
      timeAgo: "1d ago",
      replies: 8,
      likes: 41,
      isPinned: false,
      preview: "Wanted to share how joining a study group completely changed my academic experience and mental health.",
      tags: ["study-group", "success", "social"],
    },
     {
      id: 7,
      title: "Tips for making friends in large lectures?",
      author: "QuietStudent",
      category: "Social Connection",
      timeAgo: "2d ago",
      replies: 19,
      likes: 33,
      isPinned: false,
      preview: "It feels impossible to meet people in a class of 300. How do you approach people without being awkward?",
      tags: ["social", "friends", "university"],
    },
    {
      id: 8,
      title: "How do you handle roommate conflicts?",
      author: "StressedRoommate",
      category: "Social Connection",
      timeAgo: "3d ago",
      replies: 25,
      likes: 38,
      isPinned: false,
      preview: "My roommate and I have completely different lifestyles and it's causing a lot of tension. Any advice for navigating this?",
      tags: ["roommates", "conflict", "communication"],
    },
    {
      id: 9,
      title: "Positive outcomes from seeking help",
      author: "GratefulStudent",
      category: "Success Stories",
      timeAgo: "4d ago",
      replies: 12,
      likes: 55,
      isPinned: false,
      preview: "I was hesitant to use campus resources, but I'm so glad I did. It made a huge difference.",
      tags: ["success", "therapy", "support"],
    },
  ]);

  const [displayedPosts, setDisplayedPosts] = useState(3);
  const forumPosts = allForumPosts.slice(0, displayedPosts);

  // FIX: Implemented handleLoadMore to add more posts
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const newDisplayCount = displayedPosts + 3;
      setDisplayedPosts(Math.min(newDisplayCount, allForumPosts.length));
      setLoadingMore(false);
      if (newDisplayCount >= allForumPosts.length) {
        toast.success("All discussions loaded!");
      } else {
        toast.success("Loaded more discussions.");
      }
    }, 1000); // Simulate network delay
  };
  
  // FIX: Implemented handleReplySubmit to add replies to posts
  const handleReplySubmit = (postId: number) => {
    if (!replyContent.trim()) {
        toast.error("Reply cannot be empty.");
        return;
    }
    // Backend Team: This is where you'd make an API call to submit the reply.
    console.log(`Replying to post ${postId}:`, replyContent);

    // Frontend update simulation
    setAllForumPosts(allForumPosts.map(p => 
        p.id === postId ? { ...p, replies: p.replies + 1 } : p
    ));

    toast.success("Your reply has been posted!");
    setActiveReply(null); // Close the reply input
    setReplyContent(""); // Reset the input field
  };

  const categoryColors = {
    "Academic Stress": "primary",
    "Social Connection": "secondary",
    "Sleep & Wellness": "accent",
    "Success Stories": "success",
    "Mental Health Support": "warning",
  };

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
                <Button 
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="bg-gradient-wellness hover:opacity-90"
                >
                  {showNewPost ? 'Cancel' : 'Start New Discussion'}
                </Button>
              </div>

              {/* New Post Form */}
              {showNewPost && (
                <Card className="mb-6 shadow-soft border-border/50">
                  <CardHeader>
                    <CardTitle>Create a New Post</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Post Title" />
                    <Textarea placeholder="Share your thoughts... (Remember to be respectful and avoid sharing personal information)" rows={4} />
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowNewPost(false)}>Cancel</Button>
                        <Button>Post</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="shadow-soft border-border/50 hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {post.isPinned && (
                            <Pin className="h-4 w-4 text-primary" />
                          )}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              categoryColors[post.category as keyof typeof categoryColors] === 'primary' ? 'border-primary/30 text-primary' :
                              categoryColors[post.category as keyof typeof categoryColors] === 'secondary' ? 'border-secondary/30 text-secondary' :
                              categoryColors[post.category as keyof typeof categoryColors] === 'accent' ? 'border-accent/30 text-accent' :
                              'border-success/30 text-success'
                            }`}
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
                        {post.preview}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
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
                                {post.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                          </div>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                           <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => setActiveReply(activeReply === post.id ? null : post.id)}
                            >
                              <Reply className="h-4 w-4 mr-1" />
                              {post.replies}
                            </Button>
                        </div>
                      </div>
                      
                      {/* FIX: Reply input section, appears when reply button is clicked */}
                      {activeReply === post.id && (
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

              {displayedPosts < allForumPosts.length && (
                <div className="text-center mt-8">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading..." : "Load More Discussions"}
                  </Button>
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
                    If you're in crisis, don't wait for community responses.
                  </p>
                  <div className="space-y-2">
                    <a href="tel:1800-599-0019" className="w-full">
                      <Button variant="destructive" size="sm" className="w-full">
                        Crisis Hotline: 1800-599-0019
                      </Button>
                    </a>
                    <Link to="/booking" className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                            Campus Counseling
                        </Button>
                    </Link>
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
