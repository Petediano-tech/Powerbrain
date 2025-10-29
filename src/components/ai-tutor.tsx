'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Bot, Sparkles, PencilRuler, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { aiSmartTutor } from '@/ai/flows/ai-smart-tutor';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { Logo } from './logo';

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
]

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const getInitials = (name: string) => {
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
    setIsLoading(true);

    try {
      const response = await aiSmartTutor({ query: prompt, gradeLevel: 'Form 3' });
      const assistantMessage: Message = { role: 'assistant', content: response.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      handleSendMessage(input);
      setInput('');
  }

  const handleSuggestionClick = (prompt: string) => {
      setInput(prompt);
      inputRef.current?.focus();
  }
  
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleFormSubmit(e as any);
    }
  }

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                <div className="space-y-6 pb-6">
                {messages.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full pt-16 text-center">
                        <div className="mb-4">
                           <Logo />
                        </div>
                        <h2 className="text-2xl font-semibold text-foreground/80">How can Brainy help you today?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
                            {promptSuggestions.map((suggestion) => (
                                <button key={suggestion.title} onClick={() => handleSuggestionClick(suggestion.prompt)} className="p-4 border rounded-lg text-left hover:bg-muted transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        {suggestion.icon}
                                        <h3 className="font-semibold">{suggestion.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{suggestion.prompt}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                        'flex items-start gap-4',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {message.role === 'assistant' && (
                        <Avatar className="h-9 w-9 bg-primary/20 text-primary border border-primary/30">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={cn(
                            'max-w-2xl rounded-xl px-4 py-3 text-sm shadow-sm',
                            message.role === 'user'
                            ? 'bg-sky-blue text-background'
                            : 'bg-muted'
                        )}
                        >
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                        {message.role === 'user' && (
                        <Avatar className="h-9 w-9">
                            <AvatarFallback>{getInitials(user?.displayName || "U")}</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex items-start gap-4 justify-start">
                        <Avatar className="h-9 w-9 bg-primary/20 text-primary border border-primary/30">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                        <div className="max-w-md rounded-xl px-4 py-3 text-sm bg-muted shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0s' }}></span>
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.2s' }}></span>
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
        </div>
        <div className="py-4">
            <form onSubmit={handleFormSubmit} className="relative">
                <Textarea
                    ref={inputRef}
                    id="message"
                    placeholder="Explain the water cycle..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    disabled={isLoading}
                    autoComplete="off"
                    rows={1}
                    className="pr-12 min-h-[48px] resize-none"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-sky-blue hover:bg-sky-blue/90 text-background flex-shrink-0">
                    <CornerDownLeft className="h-4 w-4" />
                    <span className="sr-only">Send Message</span>
                </Button>
            </form>
        </div>
    </div>
  );
}
