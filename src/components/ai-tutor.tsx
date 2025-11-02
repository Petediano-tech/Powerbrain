'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { CornerDownLeft, Bot, Sparkles, PencilRuler, BookOpen, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { aiSmartTutor } from '@/ai/flows/ai-smart-tutor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { Logo } from './logo';
import { doc, runTransaction, increment, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

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

const FREE_TIER_LIMIT = 15;

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Brainy, here to help you learn. What topic are we exploring today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { profileId } = useUserStore();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

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
    if (!prompt.trim() || !userProfileRef) return;

    if (isLimitReached) {
        toast({
            variant: "destructive",
            title: "Daily Limit Reached",
            description: "You've used all your AI questions for today. Upgrade to VIP to continue.",
        });
        return;
    }

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        // Atomically update the chat count before calling the AI
        await runTransaction(firestore, async (transaction) => {
            const profileDoc = await transaction.get(userProfileRef);
            if (!profileDoc.exists()) {
                throw "User profile does not exist!";
            }

            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const lastChat = profileDoc.data().lastChatDate;
            let newCount;

            // If the last chat was not today, reset the count. Otherwise, increment.
            if (lastChat !== today) {
                newCount = 1;
            } else {
                newCount = (profileDoc.data().dailyChatCount || 0) + 1;
            }
            
            transaction.update(userProfileRef, {
                dailyChatCount: newCount,
                lastChatDate: today,
            });
        });

        // Now call the AI
        const response = await aiSmartTutor({ query: prompt, gradeLevel: userProfile?.gradeLevel || 'Form 3' });
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


  const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      handleSendMessage(input);
  }

  const handleSuggestionClick = (prompt: string) => {
      handleSendMessage(prompt);
  }
  
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleFormSubmit(e as any);
    }
  }

  const isLimitReached = useMemo(() => {
    if (!userProfile) return false;
    // Power users have no limit
    if (userProfile.subscriptionTier && (userProfile.subscriptionTier === 'power')) return false; 
    
    const today = new Date().toISOString().split('T')[0];
    const lastChat = userProfile.lastChatDate;
    const count = userProfile.dailyChatCount || 0;

    let limit = FREE_TIER_LIMIT;
    if(userProfile.subscriptionTier === 'vip1') limit = 15;
    if(userProfile.subscriptionTier === 'vip2') limit = 30;
    if(userProfile.subscriptionTier === 'vip3') limit = 50;
    if(userProfile.subscriptionTier === 'vip4') limit = 100;

    return lastChat === today && count >= limit;
  }, [userProfile]);

  return (
    <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4 pb-20" ref={scrollAreaRef}>
                <div className="space-y-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                        'flex items-start gap-4',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {message.role === 'assistant' && (
                        <Avatar className="h-9 w-9 bg-primary/20 text-primary border border-primary/30">
                            <AvatarImage src="/ai-avatar.png" alt="Brainy" />
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
                            {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />}
                            <AvatarFallback>{getInitials(user?.displayName || "U")}</AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))
                }
                {messages.length === 1 && (
                    <div className="flex gap-2 justify-start ml-12">
                        <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Explain Photosynthesis")}>Explain Photosynthesis</Button>
                        <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Quiz me on History")}>Quiz me on History</Button>
                    </div>
                )}
                {isLoading && (
                    <div className="flex items-start gap-4 justify-start">
                        <Avatar className="h-9 w-9 bg-primary/20 text-primary border border-primary/30">
                           <AvatarImage src="/ai-avatar.png" alt="Brainy" />
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
                        <p className="text-muted-foreground mt-2 mb-4">You've used all your questions for today.</p>
                        <Button asChild>
                            <Link href="/subscribe">Upgrade to VIP to Continue</Link>
                        </Button>
                    </div>
                 )}
                </div>
            </ScrollArea>
        </div>
        <div className="py-4 bg-background">
            <form onSubmit={handleFormSubmit} className="relative">
                <Textarea
                    ref={inputRef}
                    id="message"
                    placeholder={isLimitReached ? "Upgrade to send more messages" : "Ask me anything..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    disabled={isLoading || isLimitReached || isProfileLoading}
                    autoComplete="off"
                    rows={1}
                    className="pr-12 min-h-[48px] resize-none"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim() || isLimitReached || isProfileLoading} className="absolute right-2.5 top-1/2 -translate-y-1/2 flex-shrink-0">
                    <CornerDownLeft className="h-4 w-4" />
                    <span className="sr-only">Send Message</span>
                </Button>
            </form>
        </div>
    </div>
  );
}