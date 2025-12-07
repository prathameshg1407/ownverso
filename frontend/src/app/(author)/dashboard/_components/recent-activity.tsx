// ==== FILE: src/app/(author)/dashboard/_components/recent-activity.tsx ====
/**
 * Recent Activity Component
 */

'use client';

import { formatDistanceToNow } from 'date-fns';
import {
  FileText,
  Users,
  MessageSquare,
  Star,
  DollarSign,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthorDashboard } from '@/hooks';
import type { AuthorActivity } from '@/types/api';

const activityIcons: Record<AuthorActivity['type'], React.ComponentType<{ className?: string }>> = {
  chapter_published: FileText,
  new_subscriber: Users,
  comment: MessageSquare,
  review: Star,
  payout: DollarSign,
};

export function RecentActivity() {
  const { recentActivity, isLoading } = useAuthorDashboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest updates and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/4 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No recent activity
            </p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activityIcons[activity.type] || FileText;
                return (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}