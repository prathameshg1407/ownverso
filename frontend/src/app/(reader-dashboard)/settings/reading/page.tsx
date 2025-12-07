// ==== FILE: app/(reader-dashboard)/settings/reading/page.tsx ====
/**
 * Reading Settings Page
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUserPreferences } from '@/hooks';
import { ContentPreferencesForm } from '../_components/content-preferences-form';
import { SettingsCardSkeleton } from '../_components/settings-skeleton';

export default function ReadingSettingsPage() {
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
          <CardTitle>Content Preferences</CardTitle>
          <CardDescription>Customize what content you see and your reading experience</CardDescription>
        </CardHeader>
        <CardContent>
          <ContentPreferencesForm
            initialData={{
              contentLanguages: preferences?.contentLanguages ?? ['en'],
              contentRatings: preferences?.contentRatings ?? ['EVERYONE', 'TEEN'],
              hiddenGenres: preferences?.hiddenGenres ?? [],
              hiddenTags: preferences?.hiddenTags ?? [],
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}