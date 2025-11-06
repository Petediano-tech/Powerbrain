
'use client';

import { useState, useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { subjectsData } from '@/lib/subjects-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChatRoom } from '@/components/chat-room';
import { MessageCircle, Book } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type ChatGroup = {
    id: string;
    name: string;
    description?: string;
};

const subjectIcons: { [key: string]: React.ElementType } = {
  English: Book,
  Chichewa: Book,
  Mathematics: Book,
  Biology: Book,
  Chemistry: Book,
  Physics: Book,
  Geography: Book,
  Agriculture: Book,
  History: Book,
  "Computer Studies": Book,
  "Life Skills": Book,
  "Social Studies": Book,
};


export default function ChatPage() {
    const firestore = useFirestore();
    const chatGroupsQuery = useMemoFirebase(() => query(collection(firestore, 'chatGroups')), [firestore]);
    const { data: chatGroups, isLoading } = useCollection<ChatGroup>(chatGroupsQuery);
    
    // For now, let's fall back to subjectsData if chatGroups isn't populated in Firestore
    const availableGroups = useMemo(() => {
        if (chatGroups && chatGroups.length > 0) return chatGroups;
        return subjectsData.map(s => ({...s, description: `Discuss ${s.name}`}));
    }, [chatGroups]);

    const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
            {/* Groups List */}
            <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-4">
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2"><MessageCircle /> Chat Rooms</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 flex-1">
                        <ScrollArea className="h-full">
                            {isLoading ? (
                                <div className="space-y-2 p-2">
                                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                                </div>
                            ) : availableGroups && availableGroups.length > 0 ? (
                                <div className="space-y-1 p-1">
                                    {availableGroups.map(group => {
                                        const Icon = subjectIcons[group.name] || Book;
                                        return (
                                        <button 
                                            key={group.id} 
                                            onClick={() => setSelectedGroup(group)}
                                            className={cn(
                                                `w-full text-left p-3 rounded-lg border-2 border-transparent transition-colors flex items-center gap-3`,
                                                selectedGroup?.id === group.id ? 'bg-muted border-primary/50' : 'hover:bg-muted/50'
                                            )}
                                        >
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{group.name}</p>
                                                <p className="text-xs text-muted-foreground">{group.description}</p>
                                            </div>
                                        </button>
                                    )}
                                    )}
                                </div>
                            ) : (
                                <div className="text-center p-4 text-muted-foreground">No chat rooms available.</div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Chat View */}
            <div className="md:col-span-3 lg:col-span-3">
                {selectedGroup ? (
                    <ChatRoom groupId={selectedGroup.id} groupName={selectedGroup.name} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-muted/20">
                        <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold">Select a Chat Room</h2>
                        <p className="text-muted-foreground">Choose a subject from the left to start chatting with other students.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
