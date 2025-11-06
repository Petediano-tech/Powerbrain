
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, doc } from 'firebase/firestore';
import { Send, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/hooks/use-user-store';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { fetchMessages } from '@/ai/flows/fetch-messages-flow';

interface ChatRoomProps {
    groupId: string;
    groupName: string;
}

type ChatMessage = {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    senderAvatarUrl?: string;
    timestamp: any;
};

export function ChatRoom({ groupId, groupName }: ChatRoomProps) {
    const { user } = useUser();
    const firestore = useFirestore();
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMessages = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedMessages = await fetchMessages({ groupId });
                // Firestore timestamps will be strings, so we need to convert them back to Date objects
                const formattedMessages = fetchedMessages.map(msg => ({
                    ...msg,
                    timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
                }));
                setMessages(formattedMessages as ChatMessage[]);
            } catch (e) {
                console.error("Failed to fetch messages:", e);
                setError("Could not load messages.");
            } finally {
                setIsLoading(false);
            }
        };

        if (groupId) {
            loadMessages();
            // Set up an interval to poll for new messages
            const intervalId = setInterval(loadMessages, 5000); // Poll every 5 seconds
            return () => clearInterval(intervalId);
        }

    }, [groupId]);
    
    const { profileId } = useUserStore();
    const userProfileRef = useMemoFirebase(() => profileId ? doc(firestore, 'userProfiles', profileId) : null, [firestore, profileId]);
    const { data: userProfile } = useDoc(userProfileRef);

    const displayName = useMemo(() => {
        if (userProfile) {
          const name = `${userProfile.firstName} ${userProfile.lastName}`.trim();
          if(name) return name;
        }
        if (user?.displayName) return user.displayName;
        return "Learner";
    }, [user, userProfile]);

    const userAvatarUrl = useMemo(() => {
        if (user?.photoURL) return user.photoURL;
        if (user?.uid) {
            const hash = user.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const avatarIndex = hash % PlaceHolderImages.length;
            return PlaceHolderImages[avatarIndex]?.imageUrl;
        }
        return PlaceHolderImages[0]?.imageUrl;
      }, [user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || isSending) return;

        setIsSending(true);
        const tempId = `temp_${Date.now()}`;
        const optimisticMessage: ChatMessage = {
            id: tempId,
            text: newMessage,
            senderId: user.uid,
            senderName: displayName,
            senderAvatarUrl: userAvatarUrl || undefined,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, optimisticMessage]);
        setNewMessage('');

        try {
            await addDoc(collection(firestore, 'chatGroups', groupId, 'messages'), {
                text: optimisticMessage.text,
                senderId: user.uid,
                senderName: displayName,
                senderAvatarUrl: userAvatarUrl || null,
                timestamp: serverTimestamp(),
            });
            // Optionally, you can refetch messages here to get the real message from the DB
        } catch (error) {
            console.error('Error sending message:', error);
            // Revert optimistic update
            setMessages(prev => prev.filter(msg => msg.id !== tempId));
        } finally {
            setIsSending(false);
        }
    };
    
    const getInitials = (name: string) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
                <CardTitle>{groupName}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="flex items-start gap-3">
                               <Skeleton className="h-10 w-10 rounded-full" />
                               <div className="flex-1 space-y-2">
                                   <Skeleton className="h-4 w-24" />
                                   <Skeleton className="h-8 w-1/2" />
                               </div>
                           </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center p-4 text-destructive">{error}</div>
                ) : messages && messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                             {msg.senderId !== user?.uid && (
                                <Avatar className="h-10 w-10 border">
                                    {msg.senderAvatarUrl && <AvatarImage src={msg.senderAvatarUrl} />}
                                    <AvatarFallback>{getInitials(msg.senderName)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`max-w-xs md:max-w-md ${msg.senderId === user?.uid ? 'text-right items-end' : 'text-left items-start'} flex flex-col`}>
                                <div className="text-xs text-muted-foreground mb-1">
                                    {msg.senderName}
                                    <span className="ml-2">{msg.timestamp ? formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true }) : 'sending...'}</span>
                                </div>
                                <div className={`p-3 rounded-2xl ${msg.senderId === user?.uid ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                             {msg.senderId === user?.uid && (
                                <Avatar className="h-10 w-10 border">
                                    {userAvatarUrl && <AvatarImage src={userAvatarUrl} />}
                                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))
                ) : (
                     <div className="h-full flex flex-col items-center justify-center text-center p-10">
                        <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Be the first to speak!</h3>
                        <p className="text-muted-foreground">Start the conversation in the {groupName} channel.</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isSending || !user}
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon" disabled={isSending || !newMessage.trim() || !user}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
