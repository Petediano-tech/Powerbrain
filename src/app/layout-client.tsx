'use client';
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noShellRoutes = ['/welcome', '/auth', '/login', '/signup'];

    if (noShellRoutes.includes(pathname)) {
        return <>{children}</>;
    }
    
    // Render the AppShell for all other routes
    return (
        <AppShell>
            {children}
        </AppShell>
    )
}
