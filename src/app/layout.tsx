
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Analytics } from '@vercel/analytics/react';
import RootLayoutClient from './layout-client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { FontProvider } from '@/components/font-provider';
import { useSettingsStore } from '@/hooks/use-settings-store';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Power Brain - Malawi Smart Learning & Teaching Hub',
  description: 'A digital learning movement for Malawi. Empowering every learner to dream, learn, and achieve without limits.',
};

function AppBody({ children }: { children: React.ReactNode }) {
  const { fontSize } = useSettingsStore();

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`font-body antialiased bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
          <FontProvider>
            <FirebaseClientProvider>
              <SidebarProvider>
                <AppBody>
                  <RootLayoutClient>{children}</RootLayoutClient>
                </AppBody>
              </SidebarProvider>
            </FirebaseClientProvider>
          </FontProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
