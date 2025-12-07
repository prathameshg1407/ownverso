// ==== FILE: src/app/(site)/s/[siteSlug]/_components/site-shell.tsx ====
'use client';

import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import type { PublicSite } from '@/types/api';

interface SiteShellProps {
  site: PublicSite;
  children: ReactNode;
}

export function SiteShell({ site, children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader site={site} />
      <main className="flex-1 bg-background">
        {children}
      </main>
      <SiteFooter siteName={site.name} />
    </div>
  );
}