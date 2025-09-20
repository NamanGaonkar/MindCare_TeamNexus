import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Heart, AlertCircle, CheckCircle, Shield } from "lucide-react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hi there! I'm your AI mental health companion. I'm here to provide support, coping strategies, and help you connect with resources. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { text: "I'm feeling anxious", type: "anxiety" },
    { text: "Having trouble sleeping", type: "sleep" },
    { text: "Feeling overwhelmed", type: "stress" },
    { text: "Need someone to talk to", type: "support" },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        message: "I understand you're going through a difficult time. Let me help you with some coping strategies and resources. Would you like me to guide you through a brief breathing exercise, or would you prefer to talk about what's troubling you?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: { text: string; type: string }) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      message: action.text,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Simulate AI response based on type
    setTimeout(() => {
      let botMessage = "";
      switch (action.type) {
        case "anxiety":
          botMessage = "I hear that you're feeling anxious. That's completely normal and you're not alone. Let's try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.";
          break;
        case "sleep":
          botMessage = "Sleep troubles can really affect your wellbeing. Here are some tips: Create a consistent bedtime routine, avoid screens 1 hour before bed, and try progressive muscle relaxation. Would you like me to guide you through a sleep meditation?";
          break;
        case "stress":
          botMessage = "Feeling overwhelmed is tough, but you're taking the right step by reaching out. Let's break things down together. What's the most pressing thing on your mind right now?";
          break;
        default:
          botMessage = "I'm here to listen and support you. Sometimes just talking about what's on your mind can help. What would you like to share?";
      }

      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        message: botMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <section id="ai-chat" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🤖 AI-Powered Support
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Chat with Your AI Mental Health Companion
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get immediate support, coping strategies, and guidance. Our AI is trained to provide 
              empathetic responses and knows when to connect you with human counselors.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-medium border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span>AI Mental Health Companion</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Online & Ready to Help</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && (
                          <Bot className="h-4 w-4 mt-0.5 text-primary" />
                        )}
                        {message.type === "user" && (
                          <User className="h-4 w-4 mt-0.5" />
                        )}
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-border/50 bg-muted/20">
                <p className="text-xs text-muted-foreground mb-3">Quick support options:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>End-to-end encrypted</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>Confidential & safe</span>
                    </div>
                  </div>
                  <Button variant="link" size="sm" className="text-xs p-0">
                    Connect with human counselor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Notice */}
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-warning">Important Notice</p>
                <p className="text-muted-foreground mt-1">
                  If you're experiencing thoughts of self-harm or suicide, please contact emergency services 
                  immediately or call the National Suicide Prevention Lifeline at 988.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;