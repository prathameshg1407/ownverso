// ==== FILE: src/app/(site)/s/[siteSlug]/_components/site-footer.tsx ====
'use client';

import Link from 'next/link';

interface SiteFooterProps {
  siteName: string;
}

export function SiteFooter({ siteName }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {year} {siteName}. All rights reserved.
        </p>
        <p>
          Powered by{' '}
          <Link href="/" className="font-medium underline">
            Ownverso
          </Link>
        </p>
      </div>
    </footer>
  );
}