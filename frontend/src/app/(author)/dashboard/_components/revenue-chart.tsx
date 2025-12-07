// ==== FILE: src/app/(author)/dashboard/_components/revenue-chart.tsx ====
/**
 * Revenue Chart Component (Placeholder)
 */

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthorStats } from '@/hooks';

export function RevenueChart() {
  const { stats, isLoading } = useAuthorStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Your earnings over time</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            {/* TODO: Integrate with a charting library like Recharts */}
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">
                ₹{stats?.totalRevenue.toLocaleString() ?? 0}
              </p>
              <p className="mt-2">Total Revenue</p>
              <p className="mt-4 text-sm">
                Chart visualization coming soon
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}