// ==== FILE: src/app/(author)/sites/[siteId]/pages/create/page.tsx ====
/**
 * Create Page
 */

import { type Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageEditorForm } from '../_components/page-editor-form';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

interface CreatePageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Create Page | Ownverso',
};

export default function CreatePagePage({ params }: CreatePageProps) {
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
        <h1 className="text-3xl font-bold tracking-tight">Create Page</h1>
        <p className="text-muted-foreground">
          Add a new static page to your site
        </p>
      </div>

      {/* Form */}
      <PageEditorForm siteId={params.siteId} mode="create" />
    </div>
  );
}