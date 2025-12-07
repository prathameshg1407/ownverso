// ==== FILE: src/app/(author)/sites/page.tsx ====
/**
 * Sites List Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SitesList } from './_components/sites-list';
import { SitesListSkeleton } from './_components/sites-list';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Sites | Ownverso',
  description: 'Manage your author sites',
};

export default function SitesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
          <p className="text-muted-foreground">
            Manage your storefronts and content destinations
          </p>
        </div>
        <Button asChild>
          <Link href={AUTHOR_ROUTES.createSite}>
            <Plus className="mr-2 h-4 w-4" />
            Create Site
          </Link>
        </Button>
      </div>

      {/* Sites list */}
      <Suspense fallback={<SitesListSkeleton />}>
        <SitesList />
      </Suspense>
    </div>
  );
}