'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookCopy,
  PencilRuler,
  Bot,
  FileText,
  School,
  User,
  Settings,
  Trophy,
  Layers,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/subjects', label: 'Subjects', icon: BookCopy },
  { href: '/quizzes', label: 'Quizzes', icon: PencilRuler },
  { href: '/tutor', label: 'Brainy', icon: Bot },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/teacher', label: "Teacher's Corner", icon: School },
];

const bottomNavItems = [
    { href: '/profile', label: 'My Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/' || pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label} onClick={handleLinkClick}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <div className="mt-auto">
        <SidebarMenu>
            {bottomNavItems.map((item) => (
              <SidebarMenuItem key={item.label} onClick={handleLinkClick}>
                  <Link href={item.href}>
                      <SidebarMenuButton
                          isActive={isActive(item.href)}
                          tooltip={{ children: item.label }}
                      >
                          <item.icon />
                          <span>{item.label}</span>
                      </SidebarMenuButton>
                  </Link>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </div>
    </>
  );
}
