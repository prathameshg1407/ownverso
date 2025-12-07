// ==== FILE: src/app/(author)/sites/[siteId]/settings/_components/site-settings-nav.tsx ====
/**
 * Site Settings Navigation
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  Palette,
  Layout,
  Globe,
  Search,
  BarChart3,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

interface SiteSettingsNavProps {
  siteId: string;
}

const navItems = (siteId: string) => [
  {
    label: 'General',
    href: AUTHOR_ROUTES.siteSettingsGeneral(siteId),
    icon: Settings,
  },
  {
    label: 'Branding',
    href: AUTHOR_ROUTES.siteSettingsBranding(siteId),
    icon: Palette,
  },
  {
    label: 'Theme',
    href: AUTHOR_ROUTES.siteSettingsTheme(siteId),
    icon: Layout,
  },
  {
    label: 'Domain',
    href: AUTHOR_ROUTES.siteSettingsDomain(siteId),
    icon: Globe,
  },
  {
    label: 'SEO',
    href: AUTHOR_ROUTES.siteSettingsSeo(siteId),
    icon: Search,
  },
  {
    label: 'Analytics',
    href: AUTHOR_ROUTES.siteSettingsAnalytics(siteId),
    icon: BarChart3,
  },
  {
    label: 'Comments',
    href: AUTHOR_ROUTES.siteSettingsComments(siteId),
    icon: MessageSquare,
  },
  {
    label: 'Danger Zone',
    href: AUTHOR_ROUTES.siteSettingsDanger(siteId),
    icon: AlertTriangle,
    variant: 'danger' as const,
  },
];

export function SiteSettingsNav({ siteId }: SiteSettingsNavProps) {
  const pathname = usePathname();
  const items = navItems(siteId);

  return (
    <nav className="flex flex-col space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              item.variant === 'danger' && !isActive && 'text-destructive hover:text-destructive'
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}