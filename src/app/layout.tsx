
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import RootLayoutClient from './layout-client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PomodoroTimer } from '@/components/pomodoro-timer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Power Brain - Malawi Smart Learning & Teaching Hub',
  description: 'A digital learning movement for Malawi. Empowering every learner to dream, learn, and achieve without limits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${poppins.variable} font-body antialiased bg-background text-foreground`}>
        <FirebaseClientProvider>
          <SidebarProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
            <PomodoroTimer />
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
