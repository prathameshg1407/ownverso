// ==== FILE: src/app/(author)/sites/[siteId]/collaborators/page.tsx ====
/**
 * Collaborators Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { CollaboratorsList } from './_components/collaborators-list';
import { CollaboratorsListSkeleton } from './_components/collaborators-list';

interface CollaboratorsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Collaborators | Ownverso',
};

export default function CollaboratorsPage({ params }: CollaboratorsPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collaborators</h1>
        <p className="text-muted-foreground">
          Manage team members who can access and edit this site
        </p>
      </div>

      {/* Collaborators list */}
      <Suspense fallback={<CollaboratorsListSkeleton />}>
        <CollaboratorsList siteId={params.siteId} />
      </Suspense>
    </div>
  );
}