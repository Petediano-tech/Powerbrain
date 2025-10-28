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

const user = {
  name: 'Peter',
  moodEmoji: '👋',
  classLevel: 'Form 3',
};

const motivationalQuotes = [
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs"
];

const quickAccess = [
    { name: 'Start Learning', href: '/subjects', icon: BookCopy, color: 'bg-primary/10 text-primary' },
    { name: 'Take a Quiz', href: '/quizzes', icon: PencilRuler, color: 'bg-sky-blue/10 text-sky-blue' },
    { name: 'View Notes', href: '/notes', icon: FileText, color: 'bg-accent/10 text-accent' },
    { name: "Teacher's Corner", href: '/teacher', icon: School, color: 'bg-pink-500/10 text-pink-500' }
];

export default function DashboardPage() {
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const studyScore = 78;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {user.moodEmoji} Hello {user.name}!
        </h1>
        <p className="text-muted-foreground">
          Ready to supercharge your brain today? You are in {user.classLevel}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickAccess.map((item) => (
          <Card key={item.name} className="hover:border-primary transition-colors shadow-sm hover:shadow-primary/20">
            <Link href={item.href} className="block h-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className={`flex items-center justify-center rounded-lg p-2 w-fit ${item.color}`}>
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
          </CardContent>
        </Card>
        <Card className="md:col-span-2 bg-gradient-to-tr from-card to-accent/10">
          <CardHeader>
            <CardTitle>Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/90">
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
            <li className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
              <div>
                <p className="font-medium">Mathematics - Algebra Basics</p>
                <p className="text-sm text-muted-foreground">Completed yesterday</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-primary">85%</span>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </li>
            <li className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg">
              <div>
                <p className="font-medium">English - Grammar</p>
                <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-sky-blue">92%</span>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
