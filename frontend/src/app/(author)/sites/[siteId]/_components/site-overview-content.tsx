// ==== FILE: src/app/(author)/sites/[siteId]/_components/site-overview-content.tsx ====
/**
 * Site Overview Content
 */

'use client';

import { formatDistanceToNow } from 'date-fns';
import {
  DollarSign,
  ExternalLink,
  Eye,
  FileText,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';

import { SiteStatusBadge } from '@/components/sites/site-status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteDetail } from '@/hooks';
import { AUTHOR_ROUTES, PUBLIC_ROUTES } from '@/lib/constants/routes';
import { SiteHeader } from './site-header';

interface SiteOverviewContentProps {
  siteId: string;
}

export function SiteOverviewContent({ siteId }: SiteOverviewContentProps) {
  const { site, overview, stats, isLoading, isError } = useSiteDetail(siteId);

  if (isLoading) {
    return <SiteOverviewSkeleton />;
  }

  if (isError || !site) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-destructive">Site not found</h2>
        <p className="mt-2 text-muted-foreground">
          The site you're looking for doesn't exist or you don&apos;t have access.
        </p>
        <Button asChild className="mt-4">
          <Link href={AUTHOR_ROUTES.sites}>Back to Sites</Link>
        </Button>
      </div>
    );
  }

  const siteUrl = site.customDomain
    ? `https://${site.customDomain}`
    : `${process.env['NEXT_PUBLIC_APP_URL']}${PUBLIC_ROUTES.site(site.slug)}`;

  return (
    <div className="space-y-6">
      {/* Site Header */}
      <SiteHeader site={site} />

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Views"
          value={stats?.totalViews ?? 0}
          icon={Eye}
        />
        <StatCard
          title="Subscribers"
          value={stats?.totalSubscribers ?? 0}
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value={`₹${stats?.totalRevenue ?? 0}`}
          icon={DollarSign}
        />
        <StatCard
          title="Content"
          value={`${stats?.seriesCount ?? 0} series`}
          icon={FileText}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Site Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <SiteStatusBadge status={site.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">URL</span>
                  <a
                    href={siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    {site.customDomain || site.slug}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                {site.customDomain && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Custom Domain</span>
                    <div className="flex items-center gap-2">
                      <span>{site.customDomain}</span>
                      <Badge variant={site.customDomainVerified ? 'default' : 'secondary'}>
                        {site.customDomainVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {formatDistanceToNow(new Date(site.createdAt), { addSuffix: true })}
                  </span>
                </div>
                {site.lastPublishedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Published</span>
                    <span>
                      {formatDistanceToNow(new Date(site.lastPublishedAt), { addSuffix: true })}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={AUTHOR_ROUTES.siteSettings(siteId)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Site Settings
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={AUTHOR_ROUTES.sitePages(siteId)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Pages
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={AUTHOR_ROUTES.siteCollaborators(siteId)}>
                    <Users className="mr-2 h-4 w-4" />
                    Collaborators
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your site</CardDescription>
            </CardHeader>
            <CardContent>
              {overview?.recentActivity && overview.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {overview.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  No recent activity
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <CardDescription>Your series and chapters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-muted-foreground">
                Content management coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Traffic and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-muted-foreground">
                Analytics dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
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
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </CardContent>
    </Card>
  );
}

export function SiteOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-24 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}