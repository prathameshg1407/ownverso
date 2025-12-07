// ==== FILE: src/app/(author)/sites/_components/sites-list.tsx ====
/**
 * Sites List Component
 */

'use client';

import Link from 'next/link';
import { Globe, ExternalLink, MoreHorizontal } from 'lucide-react';

import { useSites } from '@/hooks';
import { SiteCard } from '@/components/sites/site-card';
import { EmptyState } from '@/components/ui/empty-state';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

export function SitesList() {
  const { sites, isLoading, isError } = useSites();

  if (isLoading) {
    return <SitesListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load sites. Please try again.
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <EmptyState
        icon={Globe}
        title="No sites yet"
        description="Create your first site to start publishing content and building your audience."
        action={{
          label: 'Create Site',
          href: AUTHOR_ROUTES.createSite,
        }}
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}

export function SitesListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-48 animate-pulse rounded-lg border bg-muted" />
      ))}
    </div>
  );
}