// ==== FILE: app/(reader-dashboard)/settings/layout.tsx ====

import type { Metadata } from 'next';
import { SettingsNav } from './_components/settings-nav';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="lg:w-48 shrink-0">
          <SettingsNav />
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}