// ==== FILE: src/app/(reader-dashboard)/_components/dashboard-sidebar.tsx ====
/**
 * Dashboard Sidebar
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Library,
  Bookmark,
  List,
  CreditCard,
  Heart,
  Bell,
  Settings,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { READER_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { title: 'Library', href: READER_ROUTES.library, icon: Library },
  { title: 'Bookmarks', href: `${READER_ROUTES.dashboard}/bookmarks`, icon: Bookmark },
  { title: 'Reading Lists', href: `${READER_ROUTES.dashboard}/reading-lists`, icon: List },
  { title: 'Subscriptions', href: `${READER_ROUTES.dashboard}/subscriptions`, icon: CreditCard },
  { title: 'Following', href: `${READER_ROUTES.dashboard}/following`, icon: Heart },
  { title: 'Notifications', href: `${READER_ROUTES.dashboard}/notifications`, icon: Bell },
  { title: 'Settings', href: READER_ROUTES.settings, icon: Settings },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/30 md:flex">
      <nav className="flex-1 space-y-1 p-4">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}