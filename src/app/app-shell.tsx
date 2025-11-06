
'use client';

import { capitalize } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const pageTitles: { [key: string]: string } = {
    '/home': 'Home',
    '/subjects': 'Subjects',
    '/flashcards': 'Flashcards',
    '/notes': 'My Notes',
    '/quizzes': 'Quizzes',
    '/repository': 'Resources',
    '/dashboard': 'Dashboard',
    '/teacher': "Teacher's Corner",
    '/teacher/quiz-generator': 'Quiz Generator',
    '/teacher/classes': 'My Classes',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/settings/about': 'About & Legal',
    '/settings/accessibility': 'Accessibility',
    '/settings/reading-style': 'Reading Style',
    '/subscribe': 'VIP Subscription',
    '/about': 'About Power Brain',
    '/terms': 'Terms of Service',
    '/privacy': 'Privacy Policy',
    '/contact': 'Contact Us',
    '/developers': 'The Team',
};

function getPageTitle(pathname: string) {
    if (pageTitles[pathname]) {
        return pageTitles[pathname];
    }
    if (pathname.startsWith('/subjects/')) return 'Subjects';
    if (pathname.startsWith('/quizzes/')) return 'Quizzes';
    if (pathname.startsWith('/teacher/classes/')) return 'Class Details';
    
    return null;
}

export function AppShell({ children, pathname }: { children: React.ReactNode, pathname: string }) {
    const router = useRouter();
    const pageTitle = getPageTitle(pathname);

    const showBackArrow = pathname.startsWith('/settings/') || 
                          pathname.startsWith('/teacher/classes/') ||
                          ['/about', '/terms', '/privacy', '/contact', '/developers', '/teacher/quiz-generator', '/profile'].includes(pathname);

    return (
        <div className="flex flex-col flex-1 min-w-0">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4">
                <div className="flex items-center gap-2">
                    {showBackArrow ? (
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft />
                        </Button>
                    ) : (
                        <SidebarTrigger className="md:hidden" />
                    )}
                    <h1 className="text-lg font-bold">
                        {pageTitle}
                    </h1>
                </div>
                
                 <Button asChild variant="ghost" size="icon">
                    <Link href="/settings">
                        <Settings className="h-5 w-5" />
                    </Link>
                </Button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="mx-auto w-full max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
