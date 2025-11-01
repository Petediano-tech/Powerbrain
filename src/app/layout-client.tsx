
'use client';
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noShellRoutes = ['/', '/login', '/signup', '/welcome'];

    if (noShellRoutes.includes(pathname)) {
        return <>{children}</>;
    }

    return (
        <AppShell>
            {children}
        </AppShell>
    )
}
