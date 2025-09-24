import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, User, Send, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I'm MindCare AI, your compassionate mental health companion. I'm here to listen, support, and provide guidance in a safe, confidential space. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const getBotResponse = useCallback(async (userMessage: string): Promise<string> => {
    try {
      setChatError(null);
      
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Error calling Gemini function:', error);
        throw new Error('Failed to connect to AI service');
      }

      if (data?.error) {
        console.error('Gemini API error:', data.error);
        throw new Error(data.error);
      }

      return data?.response || "I'm here to support you. How can I help you today?";
    } catch (error) {
      console.error('Error in getBotResponse:', error);
      throw error;
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { 
      sender: 'user', 
      text: input.trim(),
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(currentInput);
      const botMessage: Message = { 
        sender: 'bot', 
        text: botResponseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: "I apologize, but I'm experiencing technical difficulties right now. Your mental health is important - please consider booking a session with one of our professional counselors if you need immediate support.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Having trouble connecting to AI support. The chat will continue to work for basic support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const retryConnection = () => {
    setChatError(null);
    toast({
      title: "Reconnecting...",
      description: "Attempting to restore AI chat functionality."
    });
  };

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Please log in to access AI support.</p>
            <Button onClick={() => window.location.href = '/login'} className="mt-4">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto shadow-2xl border-border/50">
        <CardHeader className="text-center border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardTitle className="flex items-center justify-center text-2xl font-bold">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            MindCare AI Companion
          </CardTitle>
          <CardDescription className="text-base">
            Your safe, confidential space for mental health support and guidance
          </CardDescription>
          {chatError && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-sm text-destructive">Connection issues detected</span>
              <Button size="sm" variant="outline" onClick={retryConnection}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <Avatar className="w-10 h-10 bg-gradient-to-br from-primary to-secondary text-primary-foreground shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md shadow-lg'
                    : 'bg-muted/80 border border-border/50 rounded-bl-md shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                {msg.timestamp && (
                  <p className={`text-xs mt-2 opacity-70 ${
                    msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
              
              {msg.sender === 'user' && (
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  <Bot size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted/80 border border-border/50 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">MindCare AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        
        <div className="p-4 border-t border-border/50 bg-background/50">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Share what's on your mind... I'm here to listen and support you."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="pr-12 rounded-full border-border/50 focus:border-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                onClick={handleSend}
                disabled={isLoading || input.trim() === ''}
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full w-8 h-8 bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">
              💚 Remember: This AI provides support, but for serious concerns, please reach out to a counselor or mental health professional.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;