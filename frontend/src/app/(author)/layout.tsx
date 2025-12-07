// ==== FILE: src/app/(author)/layout.tsx ====
import { Suspense } from 'react';

import { AuthGuard } from '@/components/auth/auth-guard';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRoles={['AUTHOR']}>
      <DashboardLayout variant="author">
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          {children}
        </Suspense>
      </DashboardLayout>
    </AuthGuard>
  );
}