
'use client';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import TeacherPage from '../teacher/page';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { DashboardNotes } from '@/components/dashboard-notes';


export default function HomePage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = getFirestore();
    const { setProfileId } = useUserStore();

    const userAccountRef = useMemoFirebase(() => {
        if (isUserLoading || !user) return null;
        return doc(firestore, 'userAccounts', user.uid);
      }, [firestore, user, isUserLoading]);

    const { data: userAccount, isLoading: isAccountLoading } = useDoc(userAccountRef);
    
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

    const isLoading = isUserLoading || isAccountLoading || isProfileLoading;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (userProfile?.role === 'teacher') {
        return (
            <TeacherPage />
        );
    }
    
    // Student Home Page
    return (
        <div className="flex flex-col gap-6">
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
            </header>

            <Link href="/subjects">
                <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold">Continue Learning</h3>
                                 <p className="text-muted-foreground">Jump back into your subjects.</p>
                            </div>
                            <div className="p-3 bg-background rounded-lg shadow-sm">
                               <ArrowRight className="text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
            
            <DashboardNotes />
        </div>
    );
}
