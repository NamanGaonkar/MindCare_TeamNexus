
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Reply, Pin } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Placeholder data for a single post - in a real app, you'd fetch this by ID
const postData = {
  id: 1,
  title: "Managing exam anxiety - tips that actually work",
  author: "Anonymous Student",
  category: "Academic Stress",
  timeAgo: "2h ago",
  isPinned: true,
  tags: ["anxiety", "exams", "coping"],
  content: "Hey everyone, I wanted to share some techniques that really helped me during finals week. The pressure was getting to be too much, and I found that a combination of the Pomodoro Technique (25 min study, 5 min break) and some simple mindfulness exercises made a huge difference. I also made sure to get at least 30 minutes of sunlight each day. Hope this helps someone else!",
  likes: 47,
  replies: [
    {
      id: "1",
      author: "SupportivePeer",
      timeAgo: "1h ago",
      content: "This is great advice! The Pomodoro Technique is a lifesaver. I also find that writing down all my worries before an exam helps to clear my head.",
      likes: 12,
    },
    {
      id: "2",
      author: "FirstYear_2024",
      timeAgo: "45m ago",
      content: "Thanks for sharing! I've been struggling a lot with this. Going to try the sunlight tip tomorrow.",
      likes: 8,
    },
  ],
};

const PostDetail = () => {
  const { postId } = useParams();
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replies, setReplies] = useState(postData.replies);

  const handleSubmitReply = (parentId?: string) => {
    if (!newReply.trim()) return;

    const reply = {
      id: Date.now().toString(),
      author: "You",
      timeAgo: "now",
      content: newReply,
      likes: 0,
      parentId
    };

    setReplies([...replies, reply]);
    setNewReply('');
    setReplyingTo(null);
    toast.success('Reply posted successfully!');
  };

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Post Card */}
          <Card className="shadow-soft border-border/50 mb-8">
            <CardHeader className="border-b border-border/40 p-6">
              <div className="flex items-center space-x-3 mb-3">
                {postData.isPinned && <Pin className="h-4 w-4 text-primary" />}
                <Badge variant="outline" className="text-sm">{postData.category}</Badge>
              </div>
              <CardTitle className="text-3xl font-bold">{postData.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {postData.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{postData.author}</span>
                </div>
                <span>•</span>
                <span>{postData.timeAgo}</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                <p>{postData.content}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {postData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  {postData.likes} Likes
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  <Reply className="h-5 w-5 mr-2" />
                  {postData.replies.length} Replies
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reply Input Form */}
          <Card className="shadow-soft border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Join the Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Write your reply..." 
                rows={4} 
                className="mb-4"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <Button 
                className="w-full sm:w-auto"
                onClick={() => handleSubmitReply()}
                disabled={!newReply.trim()}
              >
                Submit Reply
              </Button>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold border-b pb-3 mb-4">Replies</h3>
            {replies.map((reply) => (
              <Card key={reply.id} className="shadow-soft border-border/50 bg-card/50">
                <CardHeader className="p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-secondary/20">{reply.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{reply.author}</p>
                      <p className="text-xs text-muted-foreground">{reply.timeAgo}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm mb-4">{reply.content}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground">{reply.likes}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setReplyingTo(replyingTo === reply.id ? null : reply.id)}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                  
                  {/* Nested Reply Form */}
                  {replyingTo === reply.id && (
                    <div className="mt-4 pl-4 border-l-2 border-muted">
                      <Textarea 
                        placeholder={`Reply to ${reply.author}...`}
                        rows={3}
                        className="mb-3"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleSubmitReply(reply.id)}
                          disabled={!newReply.trim()}
                        >
                          Post Reply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setReplyingTo(null);
                            setNewReply('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default PostDetail;
