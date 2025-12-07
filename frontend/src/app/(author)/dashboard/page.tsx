// ==== FILE: src/app/(author)/dashboard/page.tsx ====
/**
 * Author Dashboard Page
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';

import { StatsOverview } from './_components/stats-overview';
import { RevenueChart } from './_components/revenue-chart';
import { RecentActivity } from './_components/recent-activity';
import { QuickActions } from './_components/quick-actions';
import { SubscriptionStatus } from './_components/subscription-status';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Dashboard | Ownverso',
  description: 'Your author dashboard',
};

export default function AuthorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your author activity.
        </p>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsOverviewSkeleton />}>
        <StatsOverview />
      </Suspense>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart - takes 2 cols */}
        <div className="lg:col-span-2">
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChart />
          </Suspense>
        </div>

        {/* Subscription status */}
        <div>
          <Suspense fallback={<CardSkeleton />}>
            <SubscriptionStatus />
          </Suspense>
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <Suspense fallback={<CardSkeleton />}>
          <RecentActivity />
        </Suspense>

        {/* Quick actions */}
        <QuickActions />
      </div>
    </div>
  );
}

function StatsOverviewSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return <Skeleton className="h-80" />;
}

function CardSkeleton() {
  return <Skeleton className="h-64" />;
}