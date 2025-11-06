
'use client';
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
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

    const noSidebarRoutes = ['/welcome', '/auth', '/notes/view'];
    const showTimerRoutes = ['/home', '/dashboard', '/subjects', '/tutor', '/repository'];

    const renderShell = !noSidebarRoutes.includes(pathname) && !pathname.startsWith('/notes/view');

    if (!renderShell) {
        return <>{children}</>;
    }
    
    return (
        <div className="flex min-h-screen">
            <AppSidebar />
            <AppShell>
                {children}
            </AppShell>
            {showTimerRoutes.includes(pathname) && <PomodoroTimer />}
        </div>
    )
}
