// ==== FILE: src/app/(site)/s/[siteSlug]/page/[pageSlug]/page.tsx ====
/**
 * Public Static Page
 */

'use client';

import { useParams } from 'next/navigation';
import { usePublicPage } from '@/hooks';
import { SiteShell } from '../_components/site-shell'; // ✅ Fixed path (up two levels)
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function PublicStaticPage() {
  const params = useParams();
  const siteSlug = params['siteSlug'] as string;  // ✅ Use bracket notation
  const pageSlug = params['pageSlug'] as string;  // ✅ Use bracket notation

  const { site, page, isLoading, isError } = usePublicPage(siteSlug, pageSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <StaticPageLoading />
      </div>
    );
  }

  if (isError || !site || !page) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This page is unavailable or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SiteShell site={site}>
      <article className="container prose prose-sm max-w-3xl py-10 dark:prose-invert">
        <h1>{page.title}</h1>
        {page.contentHtml ? (
          <div
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
            className={cn('mt-4')}
          />
        ) : (
          <pre className="mt-4 whitespace-pre-wrap text-sm">
            {page.content}
          </pre>
        )}
      </article>
    </SiteShell>
  );
}

function StaticPageLoading() {
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
        <div className="container py-10">
          <Skeleton className="h-8 w-64" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}