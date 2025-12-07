// ==== FILE: src/app/(author)/sites/[siteId]/settings/theme/page.tsx ====
/**
 * Theme Settings Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { ThemeSettingsForm } from './_components/theme-settings-form';
import { SettingsFormSkeleton } from '../general/_components/settings-form-skeleton';

interface ThemeSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Theme Settings | Ownverso',
};

export default function ThemeSettingsPage({ params }: ThemeSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <ThemeSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}