'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, PencilRuler, BookOpen, ArrowUp, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import { useToast } from '@/hooks/use-toast';
import { getTutorResponse } from '@/app/actions/ai-actions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const promptSuggestions = [
    {
        title: "Explain a concept",
        prompt: "Explain the process of photosynthesis in simple terms.",
        icon: <BookOpen className="h-5 w-5" />
    },
    {
        title: "Generate practice questions",
        prompt: "Give me three practice questions about Algebra basics.",
        icon: <PencilRuler className="h-5 w-5" />
    },
    {
        title: "Summarize my notes",
        prompt: "Summarize the following notes about World War 2: [your notes here]",
        icon: <Sparkles className="h-5 w-5" />
    }
];

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { profileId } = useUserStore();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      setMessages([
        { role: 'assistant', content: "Hello! I'm Brainy, here to help you learn. What topic are we exploring today?" }
      ]);
    }
  }, [messages.length, isLoading]);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getTutorResponse({ query: prompt, gradeLevel: userProfile?.gradeLevel || 'Form 3' });
      const assistantMessage: Message = { role: 'assistant', content: response.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSendMessage(input);
  }

  const handleSuggestionClick = (prompt: string) => {
      setInput(prompt);
      inputRef.current?.focus();
  }
  
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      const lines = part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
      return <span key={index}>{lines}</span>;
    });
  };

  return (
    <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4 pb-20" ref={scrollAreaRef}>
                <div className="space-y-6 max-w-3xl mx-auto py-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                        'flex items-start gap-4'
                        )}
                    >
                        {message.role === 'assistant' ? (
                          <Avatar className="h-9 w-9 bg-primary/20 text-primary border border-primary/30">
                              <AvatarFallback><BrainCircuit size={20}/></AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar className="h-9 w-9">
                              {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />}
                              <AvatarFallback>{getInitials(user?.displayName || "U")}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex-1">
                          <p className="font-bold mb-1">{message.role === 'assistant' ? "Brainy" : "You"}</p>
                          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground space-y-2">
                            {renderMessageContent(message.content)}
                          </div>
                        </div>
                    </div>
                    ))
                }
                {messages.length === 1 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-8">
                       {promptSuggestions.map((suggestion) => (
                        <button key={suggestion.title} onClick={() => handleSuggestionClick(suggestion.prompt)} className="text-left p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                           <div className="flex items-center gap-3">
                             {suggestion.icon}
                             <p className="font-semibold">{suggestion.title}</p>
                           </div>
                         </button>
                       ))}
                     </div>
                )}
                {isLoading && (
                    <div className="flex items-start gap-4">
                        <Avatar className="h-9 w-9 bg-primary/20 text-primary border border-primary/30">
                           <AvatarFallback><BrainCircuit size={20}/></AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-bold mb-1">Brainy</p>
                          <div className="max-w-md rounded-xl py-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0s' }}></span>
                                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.2s' }}></span>
                                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                          </div>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
        </div>
        <div className="py-4 bg-background">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleFormSubmit} className="relative">
                  <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-2xl border bg-background px-4 py-2">
                    <Textarea
                        ref={inputRef}
                        id="message"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleFormSubmit(e);
                            }
                        }}
                        disabled={isLoading || isProfileLoading}
                        autoComplete="off"
                        rows={1}
                        className="pr-12 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 shadow-none"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim() || isProfileLoading} className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Send Message</span>
                    </Button>
                  </div>
              </form>
              <p className="text-center text-xs text-muted-foreground mt-2">
                  Brainy can make mistakes. Consider checking important information.
              </p>
            </div>
        </div>
    </div>
  );
}
