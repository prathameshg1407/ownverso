// ==== FILE: src/app/(author)/sites/[siteId]/settings/layout.tsx ====
/**
 * Site Settings Layout
 */

'use client';

import { useParams } from 'next/navigation';

import { SiteSettingsNav } from './_components/site-settings-nav';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SiteSettingsLayout({ children }: SettingsLayoutProps) {
  const params = useParams();
  const siteId = params['siteId'] as string;  // ✅ Use bracket notation

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage your site configuration and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Navigation */}
        <aside className="lg:w-64">
          <SiteSettingsNav siteId={siteId} />
        </aside>

        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}