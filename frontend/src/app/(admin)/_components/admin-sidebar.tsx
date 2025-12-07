// ==== FILE: src/app/(admin)/_components/admin-sidebar.tsx ====
/**
 * Admin Sidebar Component
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Globe,
  Flag,
  MessageSquare,
  Tag,
  Settings,
  Activity,
  FileText,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { ADMIN_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Config
// ─────────────────────────────────────────────────────────────────────────────

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { title: 'Dashboard', href: ADMIN_ROUTES.dashboard, icon: LayoutDashboard },
  { title: 'Users', href: ADMIN_ROUTES.users, icon: Users },
  { title: 'Sites', href: `${ADMIN_ROUTES.dashboard}/sites`, icon: Globe },
  { title: 'Moderation', href: `${ADMIN_ROUTES.dashboard}/moderation`, icon: Flag },
  { title: 'Support', href: `${ADMIN_ROUTES.dashboard}/support`, icon: MessageSquare },
  { title: 'Taxonomies', href: `${ADMIN_ROUTES.dashboard}/taxonomies`, icon: Tag },
  { title: 'Audit Logs', href: `${ADMIN_ROUTES.dashboard}/audit-logs`, icon: FileText },
  { title: 'Health', href: `${ADMIN_ROUTES.dashboard}/health`, icon: Activity },
  { title: 'Config', href: `${ADMIN_ROUTES.dashboard}/config`, icon: Settings },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === ADMIN_ROUTES.dashboard) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      <nav className="flex-1 space-y-1 p-4">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
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