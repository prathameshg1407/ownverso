// ==== FILE: src/app/(author)/sites/[siteId]/pages/page.tsx ====
/**
 * Site Pages List
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PagesList } from './_components/pages-list';
import { PagesListSkeleton } from './_components/pages-list';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

interface PagesPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Pages | Ownverso',
};

export default function PagesPage({ params }: PagesPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">
            Manage static pages for your site
          </p>
        </div>
        <Button asChild>
          <Link href={AUTHOR_ROUTES.siteCreatePage(params.siteId)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Page
          </Link>
        </Button>
      </div>

      {/* Pages list */}
      <Suspense fallback={<PagesListSkeleton />}>
        <PagesList siteId={params.siteId} />
      </Suspense>
    </div>
  );
}