
'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from './logo';
import { SidebarNav } from './sidebar-nav';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useUser } from '@/firebase';
import { Button } from './ui/button';
import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useMemo } from 'react';

function getPageTitle(pathname: string) {
    if (pathname === '/home') return 'Home';
    if (pathname === '/tutor') return 'Brainy';
    if (pathname === '/profile') return 'My Profile';
    const pageName = pathname.split('/').pop() || 'Home';
    return capitalize(pageName.replace('-', ' '));
}

export function AppHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const router = useRouter();

  const { user } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/welcome');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const displayName = useMemo(() => {
    if (user?.displayName) return user.displayName;
    return 'User';
  }, [user]);
  
  return (
    <>
      {/* Sidebar for both mobile and desktop */}
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>

      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:pl-[var(--sidebar-width-icon)]">
         <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-semibold md:text-xl">
          {pageTitle}
        </h1>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    {user?.photoURL && <AvatarImage src={user.photoURL} alt={displayName} />}
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
               <DropdownMenuLabel>
                <p>My Account</p>
                {user?.email && <p className="text-xs text-muted-foreground font-normal">{user.email}</p>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile" passHref>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/settings" passHref>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
