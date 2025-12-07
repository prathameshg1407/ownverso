// ==== FILE: src/components/layouts/marketing-footer.tsx ====
/**
 * Marketing Footer Component
 */

import Link from 'next/link';
import { PUBLIC_ROUTES, LEGAL_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_SECTIONS = [
  {
    title: 'Product',
    links: [
      { href: PUBLIC_ROUTES.features, label: 'Features' },
      { href: PUBLIC_ROUTES.pricing, label: 'Pricing' },
      { href: PUBLIC_ROUTES.blog, label: 'Blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: PUBLIC_ROUTES.about, label: 'About' },
      { href: PUBLIC_ROUTES.contact, label: 'Contact' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: LEGAL_ROUTES.terms, label: 'Terms' },
      { href: LEGAL_ROUTES.privacy, label: 'Privacy' },
      { href: LEGAL_ROUTES.cookies, label: 'Cookies' },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { href: 'https://twitter.com', label: 'Twitter' },
  { href: 'https://discord.gg', label: 'Discord' },
  { href: 'https://github.com', label: 'GitHub' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function MarketingFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 lg:py-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
                <span className="text-xs font-bold text-background">N</span>
              </div>
              <span className="font-semibold">NovelHub</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The modern platform for storytellers and readers.
            </p>
          </div>

          {/* Link Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NovelHub. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}