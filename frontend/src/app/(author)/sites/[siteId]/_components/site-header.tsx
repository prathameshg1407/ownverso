// ==== FILE: src/app/(author)/sites/[siteId]/_components/site-header.tsx ====
'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SiteStatusBadge } from '@/components/sites/site-status-badge';
import { AUTHOR_ROUTES, PUBLIC_ROUTES } from '@/lib/constants/routes';
import type { Site } from '@/types/api';

interface SiteHeaderProps {
  site: Site;
}

export function SiteHeader({ site }: SiteHeaderProps) {
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? '';
  
  const siteUrl = site.customDomain
    ? `https://${site.customDomain}`
    : `${baseUrl}${PUBLIC_ROUTES.site(site.slug)}`;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="-ml-2">
          <Link href={AUTHOR_ROUTES.sites}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <Avatar className="h-12 w-12 rounded-lg">
          {site.logoUrl ? (
            <AvatarImage src={site.logoUrl} alt={site.name} />
          ) : (
            <AvatarFallback className="rounded-lg bg-primary/10 text-lg">
              {site.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{site.name}</h1>
            <SiteStatusBadge status={site.status} />
          </div>
          {site.tagline && (
            <p className="text-muted-foreground">{site.tagline}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <a href={siteUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Site
          </a>
        </Button>
        <Button asChild>
          <Link href={AUTHOR_ROUTES.siteSettings(site.id)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}