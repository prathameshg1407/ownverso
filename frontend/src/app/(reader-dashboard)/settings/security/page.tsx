// ==== FILE: app/(reader-dashboard)/settings/security/page.tsx ====
/**
 * Security Settings Page
 */

'use client';

import { formatDistanceToNow } from 'date-fns';
import { History, Key, LogOut, Shield, Smartphone } from 'lucide-react';
import Link from 'next/link';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useUserSecurity } from '@/hooks';
import { AUTH_ROUTES } from '@/lib/constants/routes';
import { LoginHistoryTable } from '../_components/login-history-table';
import { SettingsCardSkeleton } from '../_components/settings-skeleton';

export default function SecuritySettingsPage() {
  const {
    security,
    isLoadingSecurity,
    loginHistory,
    isLoadingHistory,
    forceLogoutAll,
    isLoggingOutAll,
  } = useUserSecurity();

  if (isLoadingSecurity) {
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
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Overview
          </CardTitle>
          <CardDescription>Your account security status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    {security?.mfaEnabled
                      ? 'Your account is protected with MFA'
                      : 'Add an extra layer of security'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={security?.mfaEnabled ? 'default' : 'secondary'}>
                  {security?.mfaEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <Button variant="outline" size="sm" asChild>
                  <Link href={AUTH_ROUTES.mfaSetup}>{security?.mfaEnabled ? 'Manage' : 'Enable'}</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    {security?.passwordChangedAt
                      ? `Changed ${formatDistanceToNow(new Date(security.passwordChangedAt), { addSuffix: true })}`
                      : 'Never changed'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`${AUTH_ROUTES.forgotPassword}?from=settings`}>Change</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {security?.lastLoginAt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Last Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span>{new Date(security.lastLoginAt).toLocaleString()}</span>
              </div>
              {security.lastLoginIp && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="font-mono">{security.lastLoginIp}</span>
                </div>
              )}
              {security.failedLoginCount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Failed Attempts:</span>
                  <Badge variant="destructive">{security.failedLoginCount}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>Devices and browsers currently logged into your account</CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout All Devices
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Logout from all devices?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will log you out from all devices including this one. You will need to log in
                    again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => forceLogoutAll()}
                    disabled={isLoggingOutAll}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Logout All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingHistory ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded bg-muted" />
              ))}
            </div>
          ) : (
            <LoginHistoryTable sessions={loginHistory || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}