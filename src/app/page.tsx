'use client';
import { useUser } from '@/firebase';
import LoginPage from './login/page';
import AppRootPage from './(app)/page';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isUserLoading || !isClient) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (user) {
    return <AppRootPage />;
  }

  return <LoginPage />;
}
