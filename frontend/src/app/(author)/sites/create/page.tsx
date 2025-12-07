// ==== FILE: src/app/(author)/sites/create/page.tsx ====
/**
 * Create Site Page
 */

import { type Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CreateSiteForm } from './_components/create-site-form';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Create Site | Ownverso',
  description: 'Create a new author site',
};

export default function CreateSitePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back button */}
      <Button variant="ghost" asChild className="-ml-2">
        <Link href={AUTHOR_ROUTES.sites}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sites
        </Link>
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Site</h1>
        <p className="text-muted-foreground">
          Set up a new storefront for your content
        </p>
      </div>

      {/* Form */}
      <CreateSiteForm />
    </div>
  );
}