'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookCopy, FileText, PencilRuler, School, MoveRight } from "lucide-react";
import Link from 'next/link';
import { useUser, useDoc, useMemoFirebase } from "@/firebase";
import { useEffect, useState } from "react";
import { doc, getFirestore } from "firebase/firestore";

const motivationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs"
];

const quickAccess = [
    { name: 'Start Learning', href: '/subjects', icon: BookCopy },
    { name: 'Take a Quiz', href: '/quizzes', icon: PencilRuler },
    { name: 'View Notes', href: '/notes', icon: FileText },
    { name: "Teacher's Corner", href: '/teacher', icon: School }
];

export default function DashboardPage() {
  const { user } = useUser();
  const [quote, setQuote] = useState('');
  const firestore = getFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'userProfiles', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc(userProfileRef);

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  const userDetails = {
    name: user?.displayName?.split(' ')[0] || 'Learner',
    moodEmoji: '👋',
    classLevel: userProfile?.gradeLevel || 'Form 3',
  };
  const studyScore = userProfile?.averageScore || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {userDetails.moodEmoji} Hello {userDetails.name}!
        </h1>
        <p className="text-muted-foreground">
          Ready to supercharge your brain today? You are in {userDetails.classLevel}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickAccess.map((item) => (
          <Card key={item.name} className="hover:border-primary transition-colors shadow-sm hover:shadow-primary/20">
            <Link href={item.href} className="block h-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className={`flex items-center justify-center rounded-lg p-2 w-fit bg-primary/10 text-primary`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>
                <MoveRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Your Study Score</CardTitle>
            <CardDescription>Based on your recent activity and quiz scores. Keep it up!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">{studyScore}%</span>
              <Progress value={studyScore} className="h-3 w-full" />
            </div>
            <p className="text-xs text-muted-foreground">Your average score across all quizzes.</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              {quote}
            </blockquote>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Quizzes</CardTitle>
          <CardDescription>Review your latest quiz attempts.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg -m-3">
              <div>
                <p className="font-medium">Mathematics - Algebra Basics</p>
                <p className="text-sm text-muted-foreground">Completed yesterday</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-primary">85%</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/quizzes/algebra-basics">Review</Link>
                </Button>
              </div>
            </li>
            <li className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg -m-3">
              <div>
                <p className="font-medium">English - Tenses and Grammar</p>
                <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-primary">92%</span>
                 <Button variant="outline" size="sm" asChild>
                  <Link href="/quizzes/tenses-and-grammar">Review</Link>
                </Button>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
