// ==== FILE: src/app/(site)/s/[siteSlug]/_components/site-header.tsx ====
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { PublicSite } from '@/types/api';

interface SiteHeaderProps {
  site: PublicSite;
}

export function SiteHeader({ site }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between gap-4 py-4">
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
            <Link href={`/s/${site.slug}`}>
              <h1 className="text-lg font-semibold hover:underline">{site.name}</h1>
            </Link>
            {site.tagline && (
              <p className="text-xs text-muted-foreground">{site.tagline}</p>
            )}
          </div>
        </div>

        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link
            href={`/s/${site.slug}`}
            className={cn(
              'transition-colors hover:text-foreground',
              pathname === `/s/${site.slug}` ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
          {site.navPages
            .slice()
            .sort((a, b) => a.navOrder - b.navOrder)
            .map((page) => (
              <Link
                key={page.id}
                href={`/s/${site.slug}/page/${page.slug}`}
                className={cn(
                  'transition-colors hover:text-foreground',
                  pathname === `/s/${site.slug}/page/${page.slug}`
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {page.navLabel || page.title}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}