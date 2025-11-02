
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Code, Mail, Phone, MapPin, Youtube, Facebook } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const developer = {
    name: "Peter Damiano",
    role: "Full Stack Developer",
    avatar: "https://i.ibb.co/CK4P75SW/IMG-20240204-WA0000.jpg",
    phone: "+265987066051",
    email: "peterdamianotech@gmail.com",
    location: "Dzenje SFP, Mulanje, Malawi",
    socials: [
        { name: "TikTok", url: "https://www.tiktok.com/@petediano", icon: ()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12.52.02C13.83 0 15.14.01 16.44 0a5.55 5.55 0 0 1 4.23 2.04c1.47 1.6 2.33 3.43 2.33 5.66v.29c0 4.1-2.14 7.63-5.54 9.28a6.47 6.47 0 0 1-2.9.89 6.7 6.7 0 0 1-5.2-2.14 6.47 6.47 0 0 1-2.4-4.55V8.5a6.4 6.4 0 0 1 1.4-4.2C10.1 2.2 11.23.02 12.52.02Zm.01 2.18c-1.39 0-2.58.46-3.56 1.4-1.28 1.2-1.92 2.7-1.92 4.54v.13c0 2.9 1.4 5.2 3.81 6.5a4.4 4.4 0 0 0 2.28.68 4.47 4.47 0 0 0 4.19-2.73c.1-.28.18-.57.22-.88a.49.49 0 0 0-.5-.53h-1.5a.5.5 0 0 1-.5-.45v-4.5a.5.5 0 0 1 .5-.5h4.19a.5.5 0 0 0 .5-.5v-1.78a3.3 3.3 0 0 0-1.8-3.1 3.5 3.5 0 0 0-2.4-.44h-4.38Z"/></svg> },
        { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100086106805333", icon: Facebook },
        { name: "YouTube", url: "https://www.youtube.com/@PeterDamiano-f9y", icon: Youtube },
    ]
};

export default function DevelopersPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4 font-sans">
            <Card className="w-full max-w-md bg-card rounded-2xl shadow-2xl shadow-primary/10 border-primary/20 border">
                <CardHeader className="text-center items-center pt-8">
                     <div className="relative mb-4">
                        <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                            <AvatarImage src={developer.avatar} alt={developer.name} />
                            <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"></div>
                     </div>
                    <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {developer.name}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium tracking-wide">
                       {developer.role}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-4">
                            <Phone className="h-5 w-5 text-primary/80 mt-1 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs">Phone</span>
                                <a href={`tel:${developer.phone}`} className="hover:underline">{developer.phone}</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 text-primary/80 mt-1 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs">Email</span>
                                <a href={`mailto:${developer.email}`} className="hover:underline">{developer.email}</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-primary/80 mt-1 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-muted-foreground text-xs">Location</span>
                                <p>{developer.location}</p>
                            </div>
                        </div>
                    </div>
                   
                    <div className="flex justify-center gap-4 pt-4">
                        {developer.socials.map((social) => (
                           <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300">
                             {React.createElement(social.icon)}
                           </a>
                        ))}
                    </div>

                </CardContent>
                <CardContent>
                     <Button variant="outline" asChild className="w-full">
                        <Link href="/settings">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Settings
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

    