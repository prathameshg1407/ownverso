// ==== FILE: src/app/(author)/sites/[siteId]/settings/analytics/page.tsx ====
/**
 * Analytics Settings Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { AnalyticsSettingsForm } from './_components/analytics-settings-form';
import { SettingsFormSkeleton } from '../general/_components/settings-form-skeleton';

interface AnalyticsSettingsPageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Analytics Settings | Ownverso',
};

export default function AnalyticsSettingsPage({ params }: AnalyticsSettingsPageProps) {
  return (
    <Suspense fallback={<SettingsFormSkeleton />}>
      <AnalyticsSettingsForm siteId={params.siteId} />
    </Suspense>
  );
}