// ==== FILE: src/app/(author)/sites/[siteId]/settings/comments/page.tsx ====
/**
 * Comments Settings Page
 */

import { Suspense } from 'react';  // ✅ Fixed: import from 'react'
import { type Metadata } from 'next';

import { CommentsSettingsForm } from './_components/comments-settings-form';
import { SettingsFormSkeleton } from '../general/_components/settings-form-skeleton';

interface CommentsSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Comments Settings | Ownverso',
};

export default function CommentsSettingsPage({ params }: CommentsSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <CommentsSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}