// ==== FILE: src/app/(author)/sites/[siteId]/settings/danger/page.tsx ====
/**
 * Danger Zone Settings Page
 */

import { type Metadata } from 'next';

import { DangerZoneForm } from './_components/danger-zone-form';

interface DangerZonePageProps {
  params: { siteId: string };
}

export const metadata: Metadata = {
  title: 'Danger Zone | Ownverso',
};

export default function DangerZonePage({ params }: DangerZonePageProps) {
  return <DangerZoneForm siteId={params.siteId} />;
}