'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookCopy, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/subjects', label: 'Subjects', icon: BookCopy },
  { href: '/tutor', label: 'AI Chat', icon: Bot },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = item.href === '/home' ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
              <div className={cn("flex flex-col items-center gap-1 p-2 rounded-lg", isActive && "text-primary")}>
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
