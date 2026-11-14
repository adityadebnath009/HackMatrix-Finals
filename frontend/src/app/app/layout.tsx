import type { Metadata } from 'next';
import AppSidebar from '@/components/app/AppSidebar';

export const metadata: Metadata = {
  title: 'AEGISX // Security Console',
  description: 'Closed-loop autonomous AI safety and runtime defense console.',
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-on-surface antialiased">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
