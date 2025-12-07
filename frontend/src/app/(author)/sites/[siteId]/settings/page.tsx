// ==== FILE: src/app/(author)/sites/[siteId]/settings/page.tsx ====
/**
 * Site Settings Index - Redirects to General
 */

import { redirect } from 'next/navigation';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

interface SettingsPageProps {
  params: { siteId: string };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  redirect(AUTHOR_ROUTES.siteSettingsGeneral(params.siteId));
}