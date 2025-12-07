// ==== FILE: src/app/(author)/sites/[siteId]/settings/general/page.tsx ====
/**
 * General Settings Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { GeneralSettingsForm } from './_components/general-settings-form';
import { SettingsFormSkeleton } from './_components/settings-form-skeleton';

interface GeneralSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'General Settings | Ownverso',
};

export default function GeneralSettingsPage({ params }: GeneralSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <GeneralSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}