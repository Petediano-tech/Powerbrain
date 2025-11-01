'use client';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardPage from '../dashboard/page';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import { AppShell } from '@/components/app-shell';
import TeacherPage from '../teacher/page';
import { Skeleton } from '@/components/ui/skeleton';

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
    
    // Default to student dashboard
    return (
        <AppShell>
            <DashboardPage />
        </AppShell>
    )
}
