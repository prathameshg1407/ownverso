// ==== FILE: app/(reader-dashboard)/settings/privacy/page.tsx ====
/**
 * Privacy Settings Page
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUserPreferences } from '@/hooks';
import { PrivacyPreferencesForm } from '../_components/privacy-preferences-form';
import { SettingsCardSkeleton } from '../_components/settings-skeleton';

export default function PrivacySettingsPage() {
  const { preferences, isLoading } = useUserPreferences();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SettingsCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control who can see your activity and how you appear to others</CardDescription>
        </CardHeader>
        <CardContent>
          <PrivacyPreferencesForm
            initialData={{
              showOnlineStatus: preferences?.showOnlineStatus ?? true,
              showReadingActivity: preferences?.showReadingActivity ?? true,
              allowDirectMessages: preferences?.allowDirectMessages ?? true,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}