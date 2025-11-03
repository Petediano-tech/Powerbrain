
'use client';
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AppSidebar } from "@/components/app-sidebar";
import { PomodoroTimer } from "@/components/pomodoro-timer";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noShellRoutes = ['/welcome', '/auth'];
    const showTimerRoutes = ['/home', '/dashboard', '/subjects', '/tutor', '/repository'];

    if (noShellRoutes.includes(pathname)) {
        return <>{children}</>;
    }
    
    // Render the AppShell for all other routes
    return (
        <>
            <AppSidebar />
            <AppShell>
                {children}
            </AppShell>
            {showTimerRoutes.includes(pathname) && <PomodoroTimer />}
        </>
    )
}
