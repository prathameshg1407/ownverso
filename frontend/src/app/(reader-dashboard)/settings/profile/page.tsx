// ==== FILE: app/(reader-dashboard)/settings/profile/page.tsx ====
/**
 * Profile Settings Page
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUser } from '@/hooks';
import { AvatarUpload } from '../_components/avatar-upload';
import { ProfileForm } from '../_components/profile-form';
import { SocialLinksForm } from '../_components/social-links-form';
import { AvatarSkeleton, SettingsCardSkeleton } from '../_components/settings-skeleton';

export default function ProfileSettingsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <AvatarSkeleton />
          </CardHeader>
        </Card>
        <SettingsCardSkeleton />
        <SettingsCardSkeleton />
      </div>
    );
  }

  const profile = user?.profile;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a profile picture to personalize your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarUpload currentAvatarUrl={profile?.avatarUrl} displayName={user?.displayName || ''} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>This information will be displayed publicly on your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            initialData={{
              bio: profile?.bio || '',
              locale: profile?.locale || 'en',
              timezone: profile?.timezone || 'UTC',
              dataRegion: profile?.dataRegion || 'INDIA',
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Add links to your social media profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <SocialLinksForm
            initialData={{
              websiteUrl: profile?.websiteUrl || '',
              twitterHandle: profile?.twitterHandle || '',
              instagramHandle: profile?.instagramHandle || '',
              tiktokHandle: profile?.tiktokHandle || '',
              discordHandle: profile?.discordHandle || '',
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}