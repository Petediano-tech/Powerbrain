'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function AppRootPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    
    useEffect(() => {
        if (isUserLoading) return;
        if (user) {
            router.replace('/home');
        } else {
            router.replace('/welcome');
        }
    }, [user, isUserLoading, router]);

    return (
        <LoadingSpinner />
    );
}
