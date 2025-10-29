'use client';
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
import { useUser, useDoc, useMemoFirebase } from "@/firebase";
import { doc, getFirestore } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useUser();
  const firestore = getFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'userProfiles', user.uid);
  }, [firestore, user]);

  const { data: studentData } = useDoc(userProfileRef);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const displayName = user?.displayName || "User";
  const userAvatarUrl = user?.photoURL;
  const profileData = studentData || {
    gradeLevel: 'Form 1',
    studyStreaks: 0,
    totalTimeStudied: 0,
    quizzesCompleted: 0,
    topicsMastered: 0,
    badges: [],
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
            {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={displayName} />}
            <AvatarFallback className="text-3xl">{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{displayName}</CardTitle>
          <CardDescription>{profileData.gradeLevel}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-2">
          {profileData.badges.map((badge) => (
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
            <div className="text-2xl font-bold">{profileData.studyStreaks} days</div>
            <p className="text-xs text-muted-foreground">Active learning streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(profileData.totalTimeStudied / 60).toFixed(1)} hrs</div>
            <p className="text-xs text-muted-foreground">Total time this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <PencilRuler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.quizzesCompleted}</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Mastered</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.topicsMastered}</div>
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
