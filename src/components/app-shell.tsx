
'use client';
import { SidebarProvider } from "./ui/sidebar";
import { AppHeader } from "./app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-svh flex-col min-w-0">
              <AppHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
        </SidebarProvider>
    )
}
