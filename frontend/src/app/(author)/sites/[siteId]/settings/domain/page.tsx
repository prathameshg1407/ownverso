// ==== FILE: src/app/(author)/sites/[siteId]/settings/domain/page.tsx ====
/**
 * Domain Settings Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { DomainSettingsForm } from './_components/domain-settings-form';
import { SettingsFormSkeleton } from '../general/_components/settings-form-skeleton';

interface DomainSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Domain Settings | Ownverso',
};

export default function DomainSettingsPage({ params }: DomainSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <DomainSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}