'use client';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuItem, SidebarMenu, SidebarTrigger, SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Logo } from './logo';
import { SidebarNav } from './sidebar-nav';


export function AppHeader() {
  const pathname = usePathname();
  const pageTitle = pathname === '/' ? 'Dashboard' : (pathname.split('/').pop() || 'Dashboard');
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <SidebarProvider>
      {/* Desktop Sidebar */}
      <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
      
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:pl-[var(--sidebar-width-icon)]">
        <h1 className="text-lg font-semibold md:text-xl">{capitalize(pageTitle.replace('-', ' '))}</h1>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                <AvatarImage src={userAvatar?.imageUrl} alt="Peter" data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>{getInitials("Peter Phiri")}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile" passHref><DropdownMenuItem>Profile</DropdownMenuItem></Link>
              <Link href="/settings" passHref><DropdownMenuItem>Settings</DropdownMenuItem></Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </SidebarProvider>
  );
}
