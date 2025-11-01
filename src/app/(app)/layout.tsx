
'use client';
import { AppShell } from "@/components/app-shell";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // The profile page has its own layout and header, so we don't need the AppShell
    if (pathname === '/profile') {
        return <>{children}</>;
    }

    return (
        <AppShell>
            {children}
        </AppShell>
    )
}
