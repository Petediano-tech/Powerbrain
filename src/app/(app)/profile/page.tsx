import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpenCheck, PencilRuler, CalendarDays, Clock } from "lucide-react";
import { AIInsights } from "@/components/ai-insights";
import { ProgressChart } from "@/components/progress-chart";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const studentData = {
  name: "Peter Phiri",
  class: "Form 3",
  studyStreaks: 5,
  totalTimeStudied: 1240, // in minutes
  quizzesCompleted: 23,
  topicsMastered: 15,
  badges: ["Scholar", "Quiz Master", "Creative Thinker", "Science Champion"],
};

export default function ProfilePage() {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
            <AvatarImage src={userAvatar?.imageUrl} alt={studentData.name} data-ai-hint={userAvatar?.imageHint} />
            <AvatarFallback className="text-3xl">{getInitials(studentData.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{studentData.name}</CardTitle>
          <CardDescription>{studentData.class}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-2">
          {studentData.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-sm py-1 px-3 bg-accent/20 text-accent-foreground border-accent/30">{badge}</Badge>
          ))}
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streaks</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.studyStreaks} days</div>
            <p className="text-xs text-muted-foreground">Active learning streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(studentData.totalTimeStudied / 60).toFixed(1)} hrs</div>
            <p className="text-xs text-muted-foreground">Total time this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <PencilRuler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.quizzesCompleted}</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Mastered</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.topicsMastered}</div>
            <p className="text-xs text-muted-foreground">Knowledge is power</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AIInsights />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Your average scores over the last month.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ProgressChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
