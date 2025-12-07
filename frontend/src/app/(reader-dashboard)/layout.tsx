// ==== FILE: src/app/(reader-dashboard)/layout.tsx ====
/**
 * Reader Dashboard Layout
 */

import type { Metadata } from 'next';

import { AuthGuard } from '@/components/auth/auth-guard';
import { DashboardHeader } from './_components/dashboard-header';
import { DashboardSidebar } from './_components/dashboard-sidebar';

export const metadata: Metadata = {
  title: { template: '%s | Dashboard', default: 'Dashboard' },
};

interface ReaderDashboardLayoutProps {
  children: React.ReactNode;
}

export default function ReaderDashboardLayout({ children }: ReaderDashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-muted/30">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}