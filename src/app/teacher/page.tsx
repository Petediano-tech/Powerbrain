'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";
import { BarChart, FileQuestion, FileUp, Megaphone, PlusCircle, PencilRuler, BookCopy, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const quickActions = [
    { name: "Resource Library", icon: <BookCopy />, href: "/repository" },
    { name: "Quiz Creator", icon: <PencilRuler />, href: "/teacher/quiz-generator" },
    { name: "Student Analytics", icon: <BarChart />, href: "/teacher/analytics" },
    { name: "My Classes", icon: <Users />, href: "/teacher/classes" },
]

const recentActivity = [
    { type: "submission", user: "Tionge", action: "submitted", subject: "Algebra Quiz", time: "5 minutes ago", icon: <FileQuestion className="h-5 w-5"/> },
    { type: "question", user: "Chisomo", action: "asked a question in", subject: "Form 2 English", time: "12 minutes ago", icon: <FileQuestion className="h-5 w-5"/> },
    { type: "upload", user: "You", action: "shared", subject: "Biology Diagrams PDF", time: "30 minutes ago", icon: <FileUp className="h-5 w-5"/> },
]

const progressData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 59 },
  { name: 'Mar', score: 80 },
  { name: 'Apr', score: 81 },
  { name: 'May', score: 56 },
  { name: 'Jun', score: 72 },
  { name: 'Jul', score: 85 },
]

export default function TeacherPage() {
    const { user } = useUser();
    const { toast } = useToast();
    const displayName = user?.displayName || 'Atikonda';

    const handleFeatureClick = (featureName: string) => {
        toast({
            title: "Coming Soon!",
            description: `The "${featureName}" feature is under development.`,
        });
    }

  return (
    <div className="space-y-6 text-foreground bg-background">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map(action => (
                <Link href={action.href} key={action.name} onClick={(e) => {
                    if (action.href === '#') {
                        e.preventDefault();
                        handleFeatureClick(action.name);
                    }
                }}>
                    <Card className="bg-card/80 hover:bg-card transition-colors text-center p-4 h-full flex flex-col items-center justify-center cursor-pointer">
                        <div className="p-3 text-primary mb-2">
                            {action.icon}
                        </div>
                        <p className="font-semibold text-sm">{action.name}</p>
                    </Card>
                </Link>
            ))}
        </div>

        <Link href="/teacher/classes">
            <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold">Manage My Classes</h3>
                                <p className="text-muted-foreground">View student progress and manage assignments.</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg shadow-sm">
                            <ArrowRight className="text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
        

        <Card className="bg-card/80">
            <CardHeader>
                <CardTitle>Overall Student Performance</CardTitle>
                <CardDescription>Average performance across all your classes.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={progressData}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="flex items-center justify-between mt-4">
                     <p className="text-sm text-muted-foreground">Last updated: 1 hour ago</p>
                    <Button asChild variant="secondary" onClick={() => handleFeatureClick("Student Progress Details")}>
                        <Link href="#">View Details</Link>
                    </Button>
                 </div>
            </CardContent>
        </Card>

        <div>
             <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
             <div className="space-y-3">
                 {recentActivity.map((activity, index) => (
                    <Card key={index} className="bg-card/80 p-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-full text-primary">{activity.icon}</div>
                            <div>
                                <p className="font-medium text-sm">
                                    <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold">"{activity.subject}"</span>
                                </p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    </Card>
                 ))}
             </div>
        </div>
    </div>
  );
}
