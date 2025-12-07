// ==== FILE: src/app/(site)/s/[siteSlug]/_components/site-hero.tsx ====
'use client';

import Image from 'next/image';

interface SiteHeroProps {
  name: string;
  tagline: string | null;
  description: string | null;
  coverImageUrl: string | null;
}

export function SiteHero({ name, tagline, description, coverImageUrl }: SiteHeroProps) {
  return (
    <section className="border-b bg-muted/50">
      <div className="container py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{name}</h1>
            {tagline && (
              <p className="text-lg text-muted-foreground">{tagline}</p>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {coverImageUrl && (
            <div className="relative h-40 w-full overflow-hidden rounded-xl border bg-background md:h-56">
              <Image
                src={coverImageUrl}
                alt={`${name} cover`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}