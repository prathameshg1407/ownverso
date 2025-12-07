// ==== FILE: src/components/sites/site-card.tsx ====
/**
 * Site Card Component
 */

'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Globe, ExternalLink, MoreHorizontal, Settings, FileText, Users } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SiteStatusBadge } from './site-status-badge';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';
import type { SiteSummary } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SiteCardProps {
  site: SiteSummary;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function SiteCard({ site }: SiteCardProps) {
  const siteUrl = site.customDomain
    ? `https://${site.customDomain}`
    : `https://ownverso.com/s/${site.slug}`;

  return (
    <Card className="group relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-lg">
              {site.logoUrl ? (
                <AvatarImage src={site.logoUrl} alt={site.name} />
              ) : (
                <AvatarFallback className="rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-lg">{site.name}</CardTitle>
              <CardDescription className="text-xs">
                {site.customDomain || `ownverso.com/s/${site.slug}`}
              </CardDescription>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={AUTHOR_ROUTES.site(site.id)}>
                  <Globe className="mr-2 h-4 w-4" />
                  View Site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={AUTHOR_ROUTES.siteSettings(site.id)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${AUTHOR_ROUTES.site(site.id)}/pages`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Pages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`${AUTHOR_ROUTES.site(site.id)}/collaborators`}>
                  <Users className="mr-2 h-4 w-4" />
                  Collaborators
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in New Tab
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {site.tagline && (
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{site.tagline}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{site.seriesCount} series</span>
          <span>{site.subscriberCount} subscribers</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-3">
        <SiteStatusBadge status={site.status} />
        {site.lastPublishedAt && (
          <span className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(new Date(site.lastPublishedAt), { addSuffix: true })}
          </span>
        )}
      </CardFooter>

      {/* Click overlay */}
      <Link
        href={AUTHOR_ROUTES.site(site.id)}
        className="absolute inset-0 z-0"
        aria-label={`View ${site.name}`}
      />
    </Card>
  );
}