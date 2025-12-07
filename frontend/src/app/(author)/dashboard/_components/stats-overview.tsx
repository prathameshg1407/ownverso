// ==== FILE: src/app/(author)/dashboard/_components/stats-overview.tsx ====
/**
 * Stats Overview Component
 */

'use client';

import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Eye,
  FileText,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthorDashboard } from '@/hooks';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  prefix?: string;
}

function StatCard({ title, value, change, icon: Icon, prefix }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change !== undefined && (
          <p className={cn(
            'mt-1 flex items-center text-xs',
            isPositive && 'text-green-600',
            isNegative && 'text-red-600',
            !isPositive && !isNegative && 'text-muted-foreground'
          )}>
            {isPositive && <TrendingUp className="mr-1 h-3 w-3" />}
            {isNegative && <TrendingDown className="mr-1 h-3 w-3" />}
            {isPositive && '+'}
            {change}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsOverview() {
  const { stats, isLoading } = useAuthorDashboard();

  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 w-24 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Monthly Revenue"
        value={stats.monthlyRevenue}
        prefix="₹"
        icon={DollarSign}
      />
      <StatCard
        title="Subscribers"
        value={stats.subscriberCount}
        change={stats.subscriberGrowth}
        icon={Users}
      />
      <StatCard
        title="Total Views"
        value={stats.totalViews}
        change={stats.viewsGrowth}
        icon={Eye}
      />
      <StatCard
        title="Published"
        value={`${stats.seriesCount} series, ${stats.chapterCount} chapters`}
        icon={FileText}
      />
    </div>
  );
}