
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
import { useUserStore } from "@/hooks/use-user-store";
import { useMemo } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = getFirestore();
  const { profileId } = useUserStore();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);

  const { data: studentData, isLoading: isProfileLoading } = useDoc(userProfileRef);
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const userAvatarUrl = useMemo(() => {
    if (user?.photoURL) return user.photoURL;
    if (user?.uid) {
        const hash = user.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const avatarIndex = hash % PlaceHolderImages.length;
        return PlaceHolderImages[avatarIndex]?.imageUrl;
    }
    return PlaceHolderImages[0]?.imageUrl;
  }, [user]);

  const displayName = useMemo(() => {
    if (studentData) {
      const name = `${studentData.firstName} ${studentData.lastName}`.trim();
      if(name) return name;
    }
    if (user?.displayName) return user.displayName;
    return "Learner";
  }, [user, studentData]);

  const profileData = studentData || {
    gradeLevel: 'Form 1',
    studyStreaks: 0,
    totalTimeStudied: 0,
    quizzesCompleted: 0,
    topicsMastered: 0,
    badges: [],
  };

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
        <div className="space-y-6">
        <Card>
            <CardHeader className="flex flex-col items-center text-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
            </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="pb-2">
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-7 w-1/3" />
                        <Skeleton className="h-3 w-1/2 mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
        </div>
    )
  }

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
          {(profileData.badges || []).map((badge: string) => (
            <Badge key={badge} variant="secondary" className="text-sm py-1 px-3 bg-accent/20 text-accent-foreground border-accent/30">{badge}</Badge>
          ))}
           {profileData.badges?.length === 0 && <p className="text-sm text-muted-foreground">No badges earned yet. Keep learning!</p>}
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
