// ==== FILE: src/app/(author)/sites/[siteId]/pages/[pageId]/edit/page.tsx ====
/**
 * Edit Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageEditorForm } from '../../_components/page-editor-form';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';
import { Skeleton } from '@/components/ui/skeleton';

interface EditPageProps {
  params: { siteId: string; pageId: string };
}

export const metadata: Metadata = {
  title: 'Edit Page | Ownverso',
};

export default function EditPagePage({ params }: EditPageProps) {
  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" asChild className="-ml-2">
        <Link href={AUTHOR_ROUTES.sitePages(params.siteId)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pages
        </Link>
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Page</h1>
        <p className="text-muted-foreground">
          Update your page content and settings
        </p>
      </div>

      {/* Form */}
      <Suspense fallback={<PageEditorSkeleton />}>
        <PageEditorForm
          siteId={params.siteId}
          pageId={params.pageId}
          mode="edit"
        />
      </Suspense>
    </div>
  );
}

function PageEditorSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-96" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  );
}