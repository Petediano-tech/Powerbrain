
'use client';
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noShellRoutes = ['/welcome', '/auth'];

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
        </>
    )
}
