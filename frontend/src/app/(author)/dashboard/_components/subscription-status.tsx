// ==== FILE: src/app/(author)/dashboard/_components/subscription-status.tsx ====
/**
 * Subscription Status Component
 */

'use client';

import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import { CheckCircle, AlertCircle, Clock, ArrowRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuthorDashboard } from '@/hooks';
import { cn } from '@/lib/utils';
import type { PlatformSubscriptionStatus } from '@/types/api';

const statusConfig: Record<
  PlatformSubscriptionStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof CheckCircle }
> = {
  ACTIVE: { label: 'Active', variant: 'default', icon: CheckCircle },
  TRIALING: { label: 'Trial', variant: 'secondary', icon: Clock },
  PAST_DUE: { label: 'Past Due', variant: 'destructive', icon: AlertCircle },
  CANCELLED: { label: 'Cancelled', variant: 'outline', icon: AlertCircle },
  SUSPENDED: { label: 'Suspended', variant: 'destructive', icon: AlertCircle },
  EXPIRED: { label: 'Expired', variant: 'outline', icon: AlertCircle },
};

const tierNames: Record<string, string> = {
  FREE: 'Free',
  STARTER: 'Starter',
  GROWTH: 'Growth',
  PROFESSIONAL: 'Professional',
  ENTERPRISE: 'Enterprise',
};

export function SubscriptionStatus() {
  const { subscription, account, isLoading } = useAuthorDashboard();

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-5 w-32 rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-8 w-24 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return null;
  }

  const config = statusConfig[subscription.status];
  const StatusIcon = config.icon;

  // Calculate storage usage
  const storageUsed = account ? parseInt(account.storageUsedBytes) : 0;
  const storageLimit = 1073741824; // 1GB default, should come from plan limits
  const storagePercent = Math.min((storageUsed / storageLimit) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Subscription</CardTitle>
          <Badge variant={config.variant} className="flex items-center gap-1">
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>
        <CardDescription>
          {tierNames[subscription.tier]} Plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Billing cycle info */}
        {subscription.expiresAt && (
          <div className="text-sm text-muted-foreground">
            {subscription.status === 'ACTIVE' ? 'Renews' : 'Expires'}{' '}
            {format(new Date(subscription.expiresAt), 'MMM d, yyyy')}
          </div>
        )}

        {subscription.trialEndsAt && subscription.status === 'TRIALING' && (
          <div className="text-sm text-muted-foreground">
            Trial ends{' '}
            {formatDistanceToNow(new Date(subscription.trialEndsAt), {
              addSuffix: true,
            })}
          </div>
        )}

        {/* Storage usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Storage</span>
            <span>{formatBytes(storageUsed)} / {formatBytes(storageLimit)}</span>
          </div>
          <Progress value={storagePercent} className="h-2" />
        </div>

        {/* Upgrade button */}
        {subscription.tier !== 'ENTERPRISE' && (
          <Button asChild variant="outline" className="w-full">
            <Link href="/billing">
              Upgrade Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}