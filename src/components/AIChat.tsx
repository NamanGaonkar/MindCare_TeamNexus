
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// A simple mock function to simulate a bot response
const getBotResponse = (userInput: string): string => {
  const lowerCaseInput = userInput.toLowerCase();
  if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
    return "Hello there! How are you feeling today?";
  } else if (lowerCaseInput.includes('sad') || lowerCaseInput.includes('depressed')) {
    return "I'm sorry to hear that. Remember that it's okay to feel sad. Talking about it can sometimes help. I'm here to listen.";
  } else if (lowerCaseInput.includes('anxious') || lowerCaseInput.includes('stressed')) {
    return "It sounds like you're going through a lot. Take a deep breath. Sometimes focusing on your breath for a few moments can bring a sense of calm.";
  } else if (lowerCaseInput.includes('help')) {
    return "If you are in crisis, please reach out to a professional immediately. You can find resources in the 'Book Session' section.";
  } else if (lowerCaseInput.includes('thank')) {
    return "You're welcome. Remember, I'm here anytime you need to talk.";
  } else {
    return "I'm here to listen. Tell me more about what's on your mind.";
  }
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate a delay for the bot's response
    setTimeout(() => {
      const botResponseText = getBotResponse(input);
      const botMessage: Message = { sender: 'bot', text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-full w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-2xl font-bold">
          <Sparkles className="h-6 w-6 mr-2 text-primary" />
          AI Companion
        </CardTitle>
        <CardDescription>Your personal space to talk and reflect.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
              <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                <AvatarFallback><Bot size={18} /></AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted rounded-bl-none'
              }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback><User size={18} /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3">
             <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                <AvatarFallback><Bot size={18} /></AvatarFallback>
              </Avatar>
            <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-none">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-4 border-t">
        <div className="relative">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="pr-12 rounded-full"
          />
          <Button
            type="submit"
            size="icon"
            onClick={handleSend}
            disabled={isLoading}
            className="absolute top-1/2 right-1 -translate-y-1/2 rounded-full w-8 h-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
