
'use client';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardPage from './dashboard/page';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';

export default function AppRootPage() {
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

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }

  return <DashboardPage />;
}
