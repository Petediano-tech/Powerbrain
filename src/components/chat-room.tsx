
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from './ui/skeleton';
import { useUserStore } from '@/hooks/use-user-store';
import { doc, getDoc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ChatMessage = {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    senderAvatarUrl?: string;
    timestamp: any;
};

interface ChatRoomProps {
    groupId: string;
    groupName: string;
}

export function ChatRoom({ groupId, groupName }: ChatRoomProps) {
    const { user } = useUser();
    const firestore = useFirestore();
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const messagesQuery = useMemoFirebase(
        () => query(collection(firestore, `chatGroups/${groupId}/messages`), orderBy('timestamp', 'asc'), limit(50)),
        [firestore, groupId]
    );

    const { data: messages, isLoading } = useCollection<ChatMessage>(messagesQuery);

    const { profileId } = useUserStore();
    const userProfileRef = useMemoFirebase(() => profileId ? doc(firestore, 'userProfiles', profileId) : null, [firestore, profileId]);
    const { data: userProfile } = useDoc(userProfileRef);

    const displayName = useMemo(() => {
        if (userProfile) {
          const name = `${userProfile.firstName} ${userProfile.lastName}`.trim();
          if(name) return name;
        }
        if (user?.displayName) return user.displayName;
        return "Anonymous";
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

    const getInitials = (name: string) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || isSending) return;

        setIsSending(true);
        try {
            await addDoc(collection(firestore, `chatGroups/${groupId}/messages`), {
                text: newMessage,
                senderId: user.uid,
                senderName: displayName,
                senderAvatarUrl: userAvatarUrl || '',
                timestamp: serverTimestamp(),
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSending(false);
        }
    };
    
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
                <CardTitle>{groupName}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-6 space-y-6">
                        {isLoading && (
                             <div className="space-y-4">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-12 w-1/2 ml-auto" />
                                <Skeleton className="h-12 w-2/3" />
                            </div>
                        )}
                        {!isLoading && messages && messages.length === 0 && (
                            <div className="text-center text-muted-foreground pt-10">
                                <MessageCircle className="mx-auto h-10 w-10 mb-2" />
                                <p>No messages yet. Be the first to say something!</p>
                            </div>
                        )}
                        {!isLoading && messages && messages.map(msg => (
                            <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === user?.uid ? 'flex-row-reverse' : ''}`}>
                                 <Avatar className="h-9 w-9">
                                    <AvatarImage src={msg.senderAvatarUrl} />
                                    <AvatarFallback>{getInitials(msg.senderName)}</AvatarFallback>
                                </Avatar>
                                <div className={`p-3 rounded-lg max-w-sm ${msg.senderId === user?.uid ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="text-sm font-semibold">{msg.senderId === user?.uid ? 'You' : msg.senderName}</p>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    <p className={`text-xs mt-1 opacity-70 ${msg.senderId === user?.uid ? 'text-right' : 'text-left'}`}>
                                        {msg.timestamp ? formatDistanceToNow(msg.timestamp.toDate(), { addSuffix: true }) : 'sending...'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
                    <Input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isSending}
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim() || isSending}>
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
