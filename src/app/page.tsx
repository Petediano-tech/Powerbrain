'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
}
