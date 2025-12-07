// ==== FILE: app/(reader-dashboard)/settings/notifications/page.tsx ====
/**
 * Notifications Settings Page
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUserPreferences } from '@/hooks';
import { NotificationPreferencesForm } from '../_components/notification-preferences-form';
import { SettingsCardSkeleton } from '../_components/settings-skeleton';

export default function NotificationsSettingsPage() {
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
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how and when you want to be notified</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationPreferencesForm
            initialData={{
              emailNotifications: preferences?.emailNotifications ?? true,
              pushNotifications: preferences?.pushNotifications ?? true,
              emailDigestFrequency: preferences?.emailDigestFrequency ?? 'DAILY',
              marketingEmails: preferences?.marketingEmails ?? false,
              newsletterOptIn: preferences?.newsletterOptIn ?? false,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}