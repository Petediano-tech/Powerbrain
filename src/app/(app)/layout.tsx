import { AppHeader } from '@/components/app-header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader />
      <main className="p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
