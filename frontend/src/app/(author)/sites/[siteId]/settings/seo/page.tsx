// ==== FILE: src/app/(author)/sites/[siteId]/settings/seo/page.tsx ====
/**
 * SEO Settings Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { SeoSettingsForm } from './_components/seo-settings-form';
import { SettingsFormSkeleton } from '../general/_components/settings-form-skeleton';

interface SeoSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'SEO Settings | Ownverso',
};

export default function SeoSettingsPage({ params }: SeoSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <SeoSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}