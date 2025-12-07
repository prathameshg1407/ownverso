// ==== FILE: src/app/(author)/sites/[siteId]/page.tsx ====
/**
 * Site Overview Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { SiteOverviewContent } from './_components/site-overview-content';
import { SiteOverviewSkeleton } from './_components/site-overview-content';

interface SitePageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Site Overview | Ownverso',
};

export default function SitePage({ params }: SitePageProps) {
  return (
    <Suspense fallback={<SiteOverviewSkeleton />}>
      <SiteOverviewContent siteId={params.siteId} />
    </Suspense>
  );
}