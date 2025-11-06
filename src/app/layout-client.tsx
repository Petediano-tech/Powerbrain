
'use client';
import { usePathname } from "next/navigation";
import { AppShell } from "@/app/app-shell";
import { AppSidebar } from "@/components/app-sidebar";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useEffect } from "react";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { fontSize } = useSettingsStore();

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    const noShellRoutes = ['/welcome', '/auth'];
    const noHeaderRoutes = ['/notes/view'];
    const showTimerRoutes = ['/home', '/dashboard', '/subjects', '/tutor', '/repository'];
    
    const showShell = !noShellRoutes.some(route => pathname === route);

    if (!showShell) {
        return <main>{children}</main>;
    }
    
    // For routes that need a full-screen view without the main app shell (like PDF viewer)
    if (noHeaderRoutes.some(route => pathname.startsWith(route))) {
        return <main className="min-w-0 flex-1">{children}</main>;
    }
    
    return (
        <div className="flex min-h-screen w-full">
            <AppSidebar />
            <AppShell pathname={pathname}>
                {children}
            </AppShell>
            {showTimerRoutes.includes(pathname) && <PomodoroTimer />}
        </div>
    )
}
