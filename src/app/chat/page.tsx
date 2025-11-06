
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { subjectsData } from '@/lib/subjects-data';
import { ChatRoom } from '@/components/chat-room';
import { cn } from '@/lib/utils';
import {
  Book,
  FlaskConical,
  Languages,
  Leaf,
  Globe,
  Sigma,
  Dna,
  Landmark,
  Laptop,
  HeartHandshake,
  Users,
  Palette,
  Music,
  Dumbbell
} from "lucide-react";
import { ReactElement } from "react";

const subjectIcons: { [key: string]: ReactElement } = {
  English: <Languages className="h-5 w-5" />,
  Chichewa: <Languages className="h-5 w-5" />,
  Mathematics: <Sigma className="h-5 w-5" />,
  Biology: <Dna className="h-5 w-5" />,
  Chemistry: <FlaskConical className="h-5 w-5" />,
  Physics: <Sigma className="h-5 w-5" />,
  Geography: <Globe className="h-5 w-5" />,
  Agriculture: <Leaf className="h-5 w-5" />,
  History: <Landmark className="h-5 w-5" />,
  "Computer Studies": <Laptop className="h-5 w-5" />,
  "Life Skills": <HeartHandshake className="h-5 w-5" />,
  "Social Studies": <Users className="h-5 w-5" />,
  "Creative Arts": <Palette className="h-5 w-5" />,
  "Performing Arts": <Music className="h-5 w-5" />,
  "Physical Education": <Dumbbell className="h-5 w-5" />,
  "Religious Education": <Book className="h-5 w-5" />,
};

export default function ChatPage() {
    const chatGroups = useMemo(() => subjectsData.map(s => ({
        id: s.id,
        name: s.name,
        description: `Discuss ${s.name} topics`,
        icon: subjectIcons[s.name] || <Book className="h-5 w-5" />
    })), []);

    const [selectedGroup, setSelectedGroup] = useState<(typeof chatGroups[0]) | null>(chatGroups[0] || null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
            {/* Group List */}
            <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-4">
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2"><Users /> Subject Channels</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 flex-1 overflow-y-auto">
                         <div className="space-y-1">
                            {chatGroups.map(group => (
                                <button
                                    key={group.id}
                                    onClick={() => setSelectedGroup(group)}
                                    className={cn(
                                        "w-full text-left p-3 rounded-lg border-2 border-transparent transition-colors flex items-center gap-3",
                                        selectedGroup?.id === group.id ? 'bg-muted border-primary/50' : 'hover:bg-muted/50'
                                    )}
                                >
                                    <div className="p-2 bg-background rounded-full border">
                                        {group.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{group.name}</p>
                                        <p className="text-xs text-muted-foreground">{group.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chat Room */}
            <div className="md:col-span-2 lg:col-span-3 h-full">
                {selectedGroup ? (
                    <ChatRoom groupId={selectedGroup.id} groupName={selectedGroup.name} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-muted/20">
                        <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold">Select a Channel</h2>
                        <p className="text-muted-foreground">Choose a subject from the left to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
