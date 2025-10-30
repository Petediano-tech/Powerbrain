
'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Bot, Sparkles, PencilRuler, BookOpen, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { aiSmartTutor } from '@/ai/flows/ai-smart-tutor';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { Logo } from './logo';
import { doc, runTransaction, increment } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import Link from 'next/link';

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

const FREE_TIER_LIMIT = 3;

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
  const { data: userProfile } = useDoc(userProfileRef);

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
    if (!prompt.trim() || !userProfileRef) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
        await runTransaction(firestore, async (transaction) => {
            const profileDoc = await transaction.get(userProfileRef);
            if (!profileDoc.exists()) {
                throw new Error("User profile not found!");
            }
            
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const lastChat = profileDoc.data().lastChatDate;
            let currentCount = profileDoc.data().dailyChatCount || 0;

            if (lastChat !== today) {
                currentCount = 0; // Reset count for the new day
            }
            
            transaction.update(userProfileRef, {
                dailyChatCount: increment(1),
                lastChatDate: today,
            });
        });

        const response = await aiSmartTutor({ query: prompt, gradeLevel: userProfile?.gradeLevel || 'Form 3' });
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

  const isLimitReached = useMemo(() => {
    if (!userProfile) return false;
    if (userProfile.subscriptionTier && userProfile.subscriptionTier !== 'free') return false; // Not a free user
    
    const today = new Date().toISOString().split('T')[0];
    const lastChat = userProfile.lastChatDate;
    const count = userProfile.dailyChatCount || 0;

    return lastChat === today && count >= FREE_TIER_LIMIT;
  }, [userProfile]);

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                <div className="space-y-6 pb-6">
                {messages.length === 0 && !isLoading && !isLimitReached ? (
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
                            ? 'bg-primary text-primary-foreground'
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
                 {isLimitReached && (
                    <div className="text-center p-8 rounded-lg bg-muted/50 border border-dashed flex flex-col items-center">
                        <Crown className="h-12 w-12 text-yellow-500 mb-4" />
                        <h3 className="text-xl font-bold">Daily Limit Reached</h3>
                        <p className="text-muted-foreground mt-2 mb-4">You've used all your free questions for today.</p>
                        <Button asChild>
                            <Link href="/subscribe">Upgrade to VIP to Continue</Link>
                        </Button>
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
                    placeholder={isLimitReached ? "Upgrade to send more messages" : "Explain the water cycle..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    disabled={isLoading || isLimitReached}
                    autoComplete="off"
                    rows={1}
                    className="pr-12 min-h-[48px] resize-none"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim() || isLimitReached} className="absolute right-2.5 top-1/2 -translate-y-1/2 flex-shrink-0">
                    <CornerDownLeft className="h-4 w-4" />
                    <span className="sr-only">Send Message</span>
                </Button>
            </form>
        </div>
    </div>
  );
}
