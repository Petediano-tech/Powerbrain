
'use client';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { useUser } from '@/firebase';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { navItems } from '@/app/sidebar-nav';
import { Badge } from './ui/badge';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { setOpenMobile } = useSidebar();

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
    return 'Power Brain User';
  }, [user]);

  const userAvatarUrl = useMemo(() => {
    if (user?.photoURL) return user.photoURL;
    if (user?.uid) {
        const hash = user.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const avatarIndex = hash % PlaceHolderImages.length;
        return PlaceHolderImages[avatarIndex]?.imageUrl;
    }
    return PlaceHolderImages[0]?.imageUrl;
  }, [user]);

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
             const isActive = item.href === '/home' ? pathname === item.href : pathname.startsWith(item.href);
             return (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href} className="w-full" onClick={() => setOpenMobile(false)}>
                        <SidebarMenuButton isActive={isActive}>
                            <item.icon />
                            {item.label}
                            {item.isPremium && <Badge variant="secondary" className="ml-auto bg-yellow-400/20 text-yellow-500 border-none">VIP</Badge>}
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
             )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/profile" onClick={() => setOpenMobile(false)}>
            <div className={cn("flex items-center gap-3 p-2 rounded-lg transition-colors", pathname.startsWith('/profile') && 'bg-muted')}>
                <Avatar className="h-9 w-9">
                    {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={displayName} />}
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
                    <p className="font-semibold text-sm truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
            </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
