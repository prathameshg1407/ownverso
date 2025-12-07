// ==== FILE: src/components/dashboard/author-sidebar.tsx ====
/**
 * Author Dashboard Sidebar
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  FileText,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  HelpCircle,
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface AuthorSidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Config
// ─────────────────────────────────────────────────────────────────────────────

const NAVIGATION: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: AUTHOR_ROUTES.dashboard, icon: LayoutDashboard },
      { label: 'Analytics', href: '/author/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Sites', href: AUTHOR_ROUTES.sites, icon: Globe },
      { label: 'All Series', href: '/author/series', icon: FileText },
    ],
  },
  {
    label: 'Audience',
    items: [
      { label: 'Subscribers', href: '/author/subscribers', icon: Users },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Billing', href: '/author/billing', icon: CreditCard },
      { label: 'Settings', href: '/author/settings', icon: Settings },
      { label: 'Help', href: '/author/help', icon: HelpCircle },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function AuthorSidebar({ open, onClose }: AuthorSidebarProps) {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    return pathname === href || (href !== AUTHOR_ROUTES.dashboard && pathname.startsWith(href));
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-card',
          'transition-transform duration-200 ease-in-out',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-full py-4">
          <div className="space-y-6 px-3">
            {NAVIGATION.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </h3>
                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = isActiveLink(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}