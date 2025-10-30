import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Poppins } from 'next/font/google';
import { AppHeader } from '@/components/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';

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
      <body className={`${poppins.variable} font-body antialiased`}>
        <FirebaseClientProvider>
          <SidebarProvider>
            <div className="flex h-svh flex-col">
              <AppHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
