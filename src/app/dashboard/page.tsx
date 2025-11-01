
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
import { BookCopy, FileText, PencilRuler, School, Bot, Book, BookA, FileDown, CalendarClock, User } from "lucide-react";
import Link from 'next/link';
import { useUser, useDoc, useMemoFirebase } from "@/firebase";
import { useEffect, useState, useMemo } from "react";
import { doc, getFirestore, collection, query, orderBy, limit } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MyCourses } from "@/components/my-courses";
import Image from "next/image";

const studyTools = [
    { name: 'Glossary', href: '#', icon: BookA },
    { name: 'Practice Quizzes', href: '/quizzes', icon: PencilRuler },
    { name: 'Downloads', href: '#', icon: FileDown },
    { name: 'Study Planner', href: '#', icon: CalendarClock }
];

const upcomingDeadlines = [
    {
        title: 'Biology Assignment',
        due: 'Due in 2 days',
        image: 'https://picsum.photos/seed/bioassign/200/100',
        imageHint: 'biology microscope'
    },
    {
        title: 'Algebra Quiz',
        due: 'Due in 4 days',
        image: 'https://picsum.photos/seed/algeq/200/100',
        imageHint: 'math equations'
    },
    {
        title: 'History Essay',
        due: 'Due in 7 days',
        image: 'https://picsum.photos/seed/histessay/200/100',
        imageHint: 'history books'
    },
];

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = getFirestore();

  const userAccountRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'userAccounts', user.uid);
  }, [firestore, user]);
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

  const coursesInProgress = 4;
  const completedLessons = 28;
  const overallProgress = 68;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border-primary">
            {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={displayName} />}
            <AvatarFallback className="text-lg">{getInitials(displayName)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold tracking-tight">
          Hello, {displayName.split(' ')[0]}!
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-1">
                <p className="text-sm text-muted-foreground">Courses in Progress</p>
                <p className="text-3xl font-bold">{coursesInProgress}</p>
              </div>
              <div className="md:col-span-1">
                <p className="text-sm text-muted-foreground">Completed Lessons</p>
                <p className="text-3xl font-bold">{completedLessons}</p>
              </div>
              <div className="md:col-span-2">
                 <p className="text-sm text-muted-foreground">Overall Progress</p>
                <div className="flex items-center gap-3">
                  <Progress value={overallProgress} className="h-2 w-full" />
                  <span className="text-sm font-semibold">{overallProgress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
          {upcomingDeadlines.map((item) => (
            <Card key={item.title} className="min-w-[220px] flex-shrink-0">
                <CardContent className="p-0">
                    <Image src={item.image} alt={item.title} width={220} height={100} className="rounded-t-lg object-cover w-full h-[100px]" data-ai-hint={item.imageHint} />
                </CardContent>
              <CardHeader className="p-4">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription className="text-amber-500 font-semibold">{item.due}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Study Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {studyTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
                <Card className="text-center p-4 h-full flex flex-col items-center justify-center hover:bg-muted transition-colors">
                    <div className="p-3 bg-primary/10 rounded-full mb-2">
                        <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">{tool.name}</p>
                </Card>
            </Link>
          ))}
        </div>
      </div>

      <MyCourses />

    </div>
  );
}
