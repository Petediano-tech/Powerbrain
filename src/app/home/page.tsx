'use client';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import { AppShell } from '@/components/app-shell';
import TeacherPage from '../teacher/page';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, BarChart2, GraduationCap, FolderKanban, PencilRuler, Bot, BookCopy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navGridItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart2, description: 'View your progress' },
    { href: '/subjects', label: 'Modules', icon: GraduationCap, description: 'Access courses' },
    { href: '/repository', label: 'Resources', icon: FolderKanban, description: 'Find notes & videos' },
    { href: '/quizzes', label: 'Quizzes', icon: PencilRuler, description: 'Assess knowledge' },
    { href: '/tutor', label: 'AI Chat', icon: Bot, description: 'Get instant help' },
    { href: '/subjects', label: 'My Subjects', icon: BookCopy, description: 'Enrolled subjects' },
];


export default function HomePage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = getFirestore();
    const { setProfileId } = useUserStore();

    const userAccountRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'userAccounts', user.uid);
      }, [firestore, user]);

    const { data: userAccount } = useDoc(userAccountRef);
    
    useEffect(() => {
        if (userAccount) {
            setProfileId(userAccount.profileId);
        }
    }, [userAccount, setProfileId]);
    
    const userProfileRef = useMemoFirebase(() => {
        if (!userAccount) return null;
        return doc(firestore, 'userProfiles', userAccount.profileId);
    }, [userAccount]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc(userProfileRef);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/welcome');
        }
    }, [user, isUserLoading, router]);

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

    const isLoading = isUserLoading || !user || isProfileLoading;

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (userProfile?.role === 'teacher') {
        return (
            <AppShell>
                <TeacherPage />
            </AppShell>
        );
    }
    
    // Student Home Page
    return (
        <div className="flex flex-col gap-6 pb-24">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border-2 border-primary">
                        {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={displayName} />}
                        <AvatarFallback className="text-lg">{getInitials(displayName)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Hi, {displayName.split(' ')[0]}!
                        </h1>
                        <p className="text-muted-foreground text-sm">Let's start learning</p>
                    </div>
                </div>
                <Bell className="h-6 w-6 text-muted-foreground" />
            </header>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for a topic..." className="pl-10 h-12 rounded-full bg-muted border-transparent focus-visible:border-primary" />
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3">Continue Learning</h2>
                <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-primary font-semibold">Biology</p>
                                <h3 className="text-xl font-bold">Chapter 2: The Cell</h3>
                                <div className="flex items-center gap-3 pt-2">
                                    <Progress value={65} className="h-2 w-full max-w-40" />
                                    <span className="text-sm font-semibold text-muted-foreground">65% complete</span>
                                </div>
                            </div>
                            <div className="p-3 bg-background rounded-lg shadow-sm">
                                {/* Placeholder for subject icon */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#00FFC6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17l10 5 10-5" stroke="#00FFC6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12l10 5 10-5" stroke="#00FFC6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
                                </svg>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {navGridItems.map((item) => (
                    <Link key={item.label} href={item.href} passHref>
                        <Card className="hover:bg-muted transition-colors h-full">
                            <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold">{item.label}</h3>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
