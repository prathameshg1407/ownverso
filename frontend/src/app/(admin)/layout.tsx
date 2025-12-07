// ==== FILE: src/app/(admin)/layout.tsx ====
/**
 * Admin Layout
 */

import type { Metadata } from 'next';

import { AuthGuard } from '@/components/auth/auth-guard';
import { AdminHeader } from './_components/admin-header';
import { AdminSidebar } from './_components/admin-sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin',
    default: 'Admin Dashboard',
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard requiredRoles={['ADMIN', 'SUPER_ADMIN']}>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 overflow-auto bg-muted/30">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}