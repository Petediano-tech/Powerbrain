
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookCopy, FileText, PencilRuler, Bot, Book, BookA, FileDown, CalendarClock, User, TrendingUp, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { useUser, useDoc, useMemoFirebase } from "@/firebase";
import { useMemo } from "react";
import { doc, getFirestore } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DashboardNotes } from "@/components/dashboard-notes";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = getFirestore();

  const userAccountRef = useMemoFirebase(() => {
    if (isUserLoading || !user) return null;
    return doc(firestore, 'userAccounts', user.uid);
  }, [firestore, user, isUserLoading]);
  const { data: userAccount } = useDoc(userAccountRef);

  const userProfileRef = useMemoFirebase(() => {
    if (!userAccount) return null;
    return doc(firestore, 'userProfiles', userAccount.profileId);
  }, [userAccount]);
  
  const { data: userProfile } = useDoc(userProfileRef);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const displayName = useMemo(() => {
    if (userProfile) {
      const name = `${userProfile.firstName} ${userProfile.lastName}`.trim();
      if(name) return name;
    }
    if (user?.displayName) return user.displayName;
    return "Learner";
  }, [user, userProfile]);

  const userAvatarUrl = useMemo(() => {
    if (user?.photoURL) return user.photoURL;
    if (user?.uid) {
        const hash = user.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const avatarIndex = hash % PlaceHolderImages.length;
        return PlaceHolderImages[avatarIndex]?.imageUrl;
    }
    return PlaceHolderImages[0]?.imageUrl;
  }, [user]);

  const topicsMastered = userProfile?.topicsMastered || 0;
  const quizzesCompleted = userProfile?.quizzesCompleted || 0;
  const overallProgress = userProfile?.averageScore || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border-primary">
            {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={displayName} />}
            <AvatarFallback className="text-lg">{getInitials(displayName)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold tracking-tight">
          Hello, {displayName.split(' ')[0]}!
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Average score on all quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizzesCompleted}</div>
            <p className="text-xs text-muted-foreground">Total quizzes taken</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Mastered</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topicsMastered}</div>
            <p className="text-xs text-muted-foreground">Total topics completed</p>
          </CardContent>
        </Card>
      </div>

      <DashboardNotes />

    </div>
  );
}
