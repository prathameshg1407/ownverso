// ==== FILE: src/app/(site)/s/[siteSlug]/layout.tsx ====
/**
 * Public Site Layout
 */

import type { ReactNode } from 'react';
import { type Metadata } from 'next';

interface SiteLayoutProps {
  children: ReactNode;
  params: { siteSlug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  _props: SiteLayoutProps
): Promise<Metadata> {
  // Optional: can fetch site SEO server-side and set metadata here later
  return {
    title: 'Site | Ownverso',
  };
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}