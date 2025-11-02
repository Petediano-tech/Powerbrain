
'use client';

import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Settings } from "lucide-react";

function getPageTitle(pathname: string) {
    if (pathname === '/home') return 'Home';
    if (pathname === '/tutor') return 'AI Chat';
    if (pathname.startsWith('/subjects')) return 'Subjects';
    if (pathname.startsWith('/quizzes')) return 'Quizzes';
    if (pathname === '/repository') return 'Resources';
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/teacher') return "Teacher's Corner";

    // These pages have their own headers now
    if (['/profile', '/settings', '/about', '/terms', '/privacy', '/contact', '/developers'].includes(pathname)) {
        return null;
    }
    if (pathname.includes('/notes/view')) {
        return null;
    }

    const pageName = pathname.split('/').pop() || 'Home';
    return capitalize(pageName.replace('-', ' '));
}

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname);

    // Don't show shell for pages that now have their own layout/header
    if (pageTitle === null) {
         return <main className="min-w-0 flex-1">{children}</main>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {pageTitle && (
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
                     <SidebarTrigger className="md:hidden" />
                    <h1 className="text-lg font-bold">
                        {pageTitle}
                    </h1>
                     <Button asChild variant="ghost" size="icon">
                        <Link href="/settings">
                            <Settings className="h-5 w-5" />
                        </Link>
                    </Button>
                </header>
            )}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    )
}
