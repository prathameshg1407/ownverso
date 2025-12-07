// ==== FILE: src/app/(site)/s/[siteSlug]/page.tsx ====
/**
 * Public Site Homepage
 */

'use client';

import { useParams } from 'next/navigation';

import { SiteShell } from './_components/site-shell';
import { SiteHero } from './_components/site-hero';
import { usePublicSite } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicSiteHomePage() {
  const params = useParams();
  const siteSlug = params['siteSlug'] as string;  // ✅ Fixed: bracket notation
  const { site, isLoading, isError } = usePublicSite(siteSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PublicSiteLoading />
      </div>
    );
  }

  if (isError || !site) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Site not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This site is unavailable or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SiteShell site={site}>
      <SiteHero
        name={site.name}
        tagline={site.tagline}
        description={site.description}
        coverImageUrl={site.coverImageUrl}
      />

      <div className="container py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PlaceholderCard title="Featured Series" />
          <PlaceholderCard title="Latest Updates" />
          <PlaceholderCard title="Support the Author" />
        </div>
      </div>
    </SiteShell>
  );
}

function PlaceholderCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Content coming soon once the content & monetization modules are wired.
      </p>
    </div>
  );
}

// ✅ Export for use in loading.tsx
export function PublicSiteLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card">
        <div className="container flex items-center gap-3 py-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background">
        <div className="container space-y-6 py-10">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}