
'use client';
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.52.02C13.83 0 15.14.01 16.44 0a5.55 5.55 0 0 1 4.23 2.04c1.47 1.6 2.33 3.43 2.33 5.66v.29c0 4.1-2.14 7.63-5.54 9.28a6.47 6.47 0 0 1-2.9.89 6.7 6.7 0 0 1-5.2-2.14 6.47 6.47 0 0 1-2.4-4.55V8.5a6.4 6.4 0 0 1 1.4-4.2C10.1 2.2 11.23.02 12.52.02Z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23-1.52.9-1.76 1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"></path>
    </svg>
);

const mainDeveloper = {
    name: "Peter Damiano",
    role: "Full Stack Developer",
    avatar: "https://i.ibb.co/CK4P75SW/IMG-20240204-WA0000.jpg",
    socials: [
        { name: "TikTok", url: "https://www.tiktok.com/@petediano", icon: TikTokIcon },
        { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100086106805333", icon: FacebookIcon },
        { name: "YouTube", url: "https://www.youtube.com/@PeterDamiano-f9y", icon: YouTubeIcon },
    ]
};

const assistant = { name: "Christina Matipwiri", role: "Assistant", avatar: "https://picsum.photos/seed/christina/200" };

const patrons = [
    { name: "Mr. Skinner", role: "Club Patron", avatar: "https://picsum.photos/seed/skinner/200", hint: "man portrait" },
    { name: "Mr. Nkhata", role: "Club Patron", avatar: "https://picsum.photos/seed/nkhata/200", hint: "man portrait" },
];

const teamMembers = [
    { name: "Fyson Nagolomwa", role: "Team Member", avatar: "https://picsum.photos/seed/fyson/200" },
    { name: "Aaron Ntuwa", role: "Team Member", avatar: "https://picsum.photos/seed/aaron/200" },
    { name: "Alfred Mathewe", role: "Team Member", avatar: "https://picsum.photos/seed/alfred/200" },
    { name: "Bruno Musunge", role: "Team Member", avatar: "https://picsum.photos/seed/bruno/200" },
    { name: "Francis Kilowe", role: "Team Member", avatar: "https://picsum.photos/seed/francis/200" },
];

export default function DevelopersPage() {
    
    const getInitials = (name: string) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-center">
                <Card className="w-full max-w-md bg-card rounded-2xl shadow-2xl shadow-primary/10 border-primary/20 border">
                    <CardHeader className="text-center items-center pt-8">
                        <div className="relative mb-4">
                            <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                                <AvatarImage src={mainDeveloper.avatar} alt={mainDeveloper.name} />
                                <AvatarFallback>{getInitials(mainDeveloper.name)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"></div>
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {mainDeveloper.name}
                        </CardTitle>
                        <CardDescription className="text-primary font-medium tracking-wide">
                        {mainDeveloper.role}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="flex justify-center gap-4">
                            {mainDeveloper.socials.map((social) => (
                            <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300">
                                {React.createElement(social.icon)}
                            </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Separator />
            
            <div>
                 <h2 className="text-2xl font-bold text-center mb-6">Core Team</h2>
                 <div className="flex justify-center">
                    <Card className="text-center w-full max-w-xs">
                        <CardContent className="p-6 flex flex-col items-center gap-3">
                            <Avatar className="h-24 w-24 border-2 border-muted">
                                <AvatarImage src={assistant.avatar} alt={assistant.name} data-ai-hint="woman portrait" />
                                <AvatarFallback>{getInitials(assistant.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">{assistant.name}</p>
                                <p className="text-sm text-muted-foreground">{assistant.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                 </div>
            </div>

            <Separator />

            <div>
                <h2 className="text-2xl font-bold text-center mb-6">Club Patrons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {patrons.map(patron => (
                        <Card key={patron.name} className="text-center">
                            <CardContent className="p-6 flex flex-col items-center gap-3">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={patron.avatar} alt={patron.name} data-ai-hint={patron.hint} />
                                    <AvatarFallback>{getInitials(patron.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-lg">{patron.name}</p>
                                    <p className="text-sm text-muted-foreground">{patron.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            <div>
                <h2 className="text-2xl font-bold text-center mb-6">Team Members</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {teamMembers.map(member => (
                        <Card key={member.name} className="text-center">
                            <CardContent className="p-6 flex flex-col items-center gap-3">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person portrait" />
                                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
