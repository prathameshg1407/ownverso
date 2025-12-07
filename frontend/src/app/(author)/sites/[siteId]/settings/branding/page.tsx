// ==== FILE: src/app/(author)/sites/[siteId]/settings/branding/page.tsx ====
/**
 * Branding Settings Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { BrandingSettingsForm } from './_components/branding-settings-form';
import { SettingsFormSkeleton } from '../general/_components/settings-form-skeleton';

interface BrandingSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Branding Settings | Ownverso',
};

export default function BrandingSettingsPage({ params }: BrandingSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <BrandingSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}