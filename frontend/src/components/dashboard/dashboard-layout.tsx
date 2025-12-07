// ==== FILE: src/components/dashboard/dashboard-layout.tsx ====
/**
 * Dashboard Layout Component
 */

'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { DashboardHeader } from '@/app/(reader-dashboard)/_components/dashboard-header';
import { DashboardSidebar } from '@/app/(reader-dashboard)/_components/dashboard-sidebar';
import { AuthorSidebar } from './author-sidebar';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface DashboardLayoutProps {
  children: React.ReactNode;
  variant?: 'reader' | 'author';
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardLayout({ children, variant = 'reader' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = variant === 'author' ? AuthorSidebar : DashboardSidebar;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader variant={variant} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className={cn(
            'flex-1 p-6 lg:p-8',
            'lg:ml-64',
            'min-h-[calc(100vh-4rem)]'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}