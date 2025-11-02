
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Code, BrainCircuit, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const developers = [
    {
        name: "Firebase Studio AI",
        role: "Lead AI Architect & Developer",
        avatar: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjE2NjU3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "The core AI engine responsible for application logic, UI generation, and feature implementation.",
        github: "https://firebase.google.com/studio"
    },
    {
        name: "You, the Visionary",
        role: "Project Director & Chief Innovator",
        avatar: "/user-avatar.png", // Placeholder
        description: "The driving force behind Power Brain, providing the vision, requirements, and creative direction.",
        github: "#"
    }
]

export default function DevelopersPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="max-w-2xl w-full">
                <CardHeader className="text-center items-center">
                    <Code className="h-12 w-12 text-primary mb-2" />
                    <CardTitle className="text-3xl">Meet the Team</CardTitle>
                    <CardDescription>
                        The minds behind the Power Brain application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {developers.map((dev) => (
                      <div key={dev.name} className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                          <Avatar className="h-20 w-20">
                              <AvatarImage src={dev.avatar} />
                              <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                              <h3 className="text-xl font-bold">{dev.name}</h3>
                              <p className="font-medium text-primary">{dev.role}</p>
                              <p className="text-sm text-muted-foreground">{dev.description}</p>
                              {dev.github !== "#" && (
                                <Button variant="ghost" size="sm" asChild className="-ml-2">
                                  <a href={dev.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    Learn More
                                  </a>
                                </Button>
                              )}
                          </div>
                      </div>
                  ))}
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
