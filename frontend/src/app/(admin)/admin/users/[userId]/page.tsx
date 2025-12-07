// ==== FILE: src/app/(admin)/admin/users/[userId]/page.tsx ====
/**
 * Admin User Detail Page
 */

'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Mail,
  Calendar,
  Clock,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

import { useAdminUser, useAdminUserActions } from '@/hooks';
import { ADMIN_ROUTES } from '@/lib/constants/routes';
import type { UserRole, UserStatus, AdminUserDetail } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Constants & Helpers
// ─────────────────────────────────────────────────────────────────────────────

const ROLES: UserRole[] = ['READER', 'AUTHOR', 'COLLABORATOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];
const STATUSES: UserStatus[] = ['ACTIVE', 'SUSPENDED', 'BANNED'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getStatusVariant(status: UserStatus): 'default' | 'secondary' | 'destructive' {
  if (status === 'ACTIVE') return 'default';
  if (status === 'PENDING_VERIFICATION') return 'secondary';
  return 'destructive';
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton & Error States
// ─────────────────────────────────────────────────────────────────────────────

function UserDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="grid gap-6 md:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64 md:col-span-2" />
      </div>
    </div>
  );
}

function UserNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">User Not Found</h1>
        <p className="mb-4 text-muted-foreground">
          The user you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Button asChild>
          <Link href={ADMIN_ROUTES.users}>Back to Users</Link>
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// User Sidebar
// ─────────────────────────────────────────────────────────────────────────────

function UserSidebar({ user }: { user: AdminUserDetail }) {
  const statusVariant = getStatusVariant(user.status);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="mb-4 h-24 w-24">
            <AvatarImage src={user.profile?.avatarUrl ?? undefined} />
            <AvatarFallback className="text-2xl">
              {getInitials(user.displayName)}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold">{user.displayName}</h2>
          <p className="text-muted-foreground">@{user.username}</p>

          <div className="mt-4 flex gap-2">
            <Badge variant="outline">{user.role}</Badge>
            <Badge variant={statusVariant}>{user.status.replace('_', ' ')}</Badge>
          </div>

          <Separator className="my-4" />

          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{user.email}</span>
              {user.emailVerified && (
                <Badge variant="secondary" className="ml-auto">Verified</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}</span>
            </div>
            {user.security?.lastLoginAt && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  Last login{' '}
                  {formatDistanceToNow(new Date(user.security.lastLoginAt), { addSuffix: true })}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>MFA {user.security?.mfaEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span>{user.sessionCount} active session(s)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Overview Tab
// ─────────────────────────────────────────────────────────────────────────────

function OverviewTab({ user }: { user: AdminUserDetail }) {
  return (
    <div className="mt-4 space-y-4">
      {user.profile && (
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.profile.bio && (
              <div>
                <label className="text-sm text-muted-foreground">Bio</label>
                <p>{user.profile.bio}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Locale</label>
                <p>{user.profile.locale}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Timezone</label>
                <p>{user.profile.timezone}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Data Region</label>
                <p>{user.profile.dataRegion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {user.readerProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Reading Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              <div>
                <div className="text-2xl font-bold">{user.readerProfile.totalSeriesRead}</div>
                <div className="text-sm text-muted-foreground">Series Read</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{user.readerProfile.totalChaptersRead}</div>
                <div className="text-sm text-muted-foreground">Chapters Read</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(user.readerProfile.totalReadTimeHours)}h
                </div>
                <div className="text-sm text-muted-foreground">Reading Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{user.readerProfile.activeSubscriptions}</div>
                <div className="text-sm text-muted-foreground">Subscriptions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {user.authorAccount && (
        <Card>
          <CardHeader>
            <CardTitle>Author Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm text-muted-foreground">Pen Name</label>
                <p>{user.authorAccount.penName || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Platform Tier</label>
                <p>{user.authorAccount.platformTier}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Verified</label>
                <p>{user.authorAccount.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Series</label>
                <p>{user.authorAccount.seriesCount}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Subscribers</label>
                <p>{user.authorAccount.activeSubscriberCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Security Tab
// ─────────────────────────────────────────────────────────────────────────────

function SecurityTab({ user }: { user: AdminUserDetail }) {
  if (!user.security) return null;

  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Security Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-muted-foreground">MFA Status</label>
              <p>{user.security.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Failed Login Attempts</label>
              <p>{user.security.failedLoginCount}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Email Verified</label>
              <p>
                {user.security.emailVerifiedAt
                  ? format(new Date(user.security.emailVerifiedAt), 'MMM d, yyyy')
                  : 'Not verified'}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground">Password Changed</label>
              <p>
                {user.security.passwordChangedAt
                  ? format(new Date(user.security.passwordChangedAt), 'MMM d, yyyy')
                  : 'Never'}
              </p>
            </div>
            {user.security.lastLoginIp && (
              <div>
                <label className="text-muted-foreground">Last Login IP</label>
                <p className="font-mono">{user.security.lastLoginIp}</p>
              </div>
            )}
            {user.security.lockedUntil && (
              <div>
                <label className="text-muted-foreground">Locked Until</label>
                <p className="text-destructive">
                  {format(new Date(user.security.lockedUntil), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
            )}
          </div>

          {user.security.statusHistory.length > 0 && (
            <div>
              <h4 className="mb-2 font-medium">Status History</h4>
              <div className="space-y-2">
                {user.security.statusHistory.slice(-5).reverse().map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{entry.status}</Badge>
                    <span className="text-muted-foreground">
                      {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm')}
                    </span>
                    {entry.reason && (
                      <span className="text-muted-foreground">- {entry.reason}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Actions Tab
// ─────────────────────────────────────────────────────────────────────────────

interface ActionsTabProps {
  user: AdminUserDetail;
  onStatusChange: (status: UserStatus) => void;
  onRoleChange: (role: UserRole) => void;
  isUpdatingStatus: boolean;
  isUpdatingRole: boolean;
}

function ActionsTab({
  user,
  onStatusChange,
  onRoleChange,
  isUpdatingStatus,
  isUpdatingRole,
}: ActionsTabProps) {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | ''>('');

  const handleStatusConfirm = useCallback(() => {
    if (selectedStatus) {
      onStatusChange(selectedStatus);
      setSelectedStatus('');
    }
  }, [selectedStatus, onStatusChange]);

  return (
    <div className="mt-4 space-y-4">
      {/* Status Change */}
      <Card>
        <CardHeader>
          <CardTitle>Change Status</CardTitle>
          <CardDescription>Update the user&apos;s account status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select
              value={selectedStatus}
              onValueChange={(v) => setSelectedStatus(v as UserStatus)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={!selectedStatus || isUpdatingStatus}>
                  Update Status
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to change this user&apos;s status to{' '}
                    <strong>{selectedStatus}</strong>?
                    {(selectedStatus === 'SUSPENDED' || selectedStatus === 'BANNED') && (
                      <span className="mt-2 block text-destructive">
                        This will revoke all active sessions.
                      </span>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleStatusConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Role Change */}
      <Card>
        <CardHeader>
          <CardTitle>Change Role</CardTitle>
          <CardDescription>Update the user&apos;s role (requires Super Admin)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select
              defaultValue={user.role}
              onValueChange={(v) => onRoleChange(v as UserRole)}
              disabled={isUpdatingRole}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Force Logout</p>
              <p className="text-sm text-muted-foreground">
                Terminate all active sessions for this user
              </p>
            </div>
            <Button variant="outline" className="text-destructive">
              Force Logout
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete this user&apos;s account
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: { userId: string };
}

export default function AdminUserDetailPage({ params }: PageProps) {
  const { data: user, isLoading } = useAdminUser(params.userId);
  const { updateStatus, isUpdatingStatus, updateRole, isUpdatingRole } = useAdminUserActions(
    params.userId
  );

  const handleStatusChange = useCallback(
    (status: UserStatus) => updateStatus({ status }),
    [updateStatus]
  );

  const handleRoleChange = useCallback(
    (role: UserRole) => updateRole({ role }),
    [updateRole]
  );

  if (isLoading) return <UserDetailSkeleton />;
  if (!user) return <UserNotFound />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={ADMIN_ROUTES.users}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <UserSidebar user={user} />

        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab user={user} />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab user={user} />
            </TabsContent>

            <TabsContent value="actions">
              <ActionsTab
                user={user}
                onStatusChange={handleStatusChange}
                onRoleChange={handleRoleChange}
                isUpdatingStatus={isUpdatingStatus}
                isUpdatingRole={isUpdatingRole}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}