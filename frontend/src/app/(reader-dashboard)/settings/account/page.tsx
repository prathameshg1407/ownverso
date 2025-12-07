// ==== FILE: app/(reader-dashboard)/settings/account/page.tsx ====
/**
 * Account Settings Page
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUser } from '@/hooks';
import { AccountForm } from '../_components/account-form';
import { DangerZone } from '../_components/danger-zone';
import { SettingsCardSkeleton } from '../_components/settings-skeleton';

export default function AccountSettingsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SettingsCardSkeleton />
        <SettingsCardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Your current account status and verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant={user?.status === 'ACTIVE' ? 'default' : 'secondary'}>{user?.status}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Email:</span>
              <Badge variant={user?.emailVerified ? 'default' : 'destructive'}>
                {user?.emailVerified ? 'Verified' : 'Not Verified'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Role:</span>
              <Badge variant="outline" className="capitalize">
                {user?.role?.toLowerCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your email, username, and display name</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountForm
            initialData={{
              email: user?.email || '',
              username: user?.username || '',
              displayName: user?.displayName || '',
            }}
            emailVerified={user?.emailVerified || false}
          />
        </CardContent>
      </Card>

      <div id="danger-zone">
        <DangerZone />
      </div>
    </div>
  );
}