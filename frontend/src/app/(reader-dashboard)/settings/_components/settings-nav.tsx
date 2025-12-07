// ==== FILE: src/app/(reader-dashboard)/settings/_components/settings-nav.tsx ====
/**
 * Settings Navigation
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Shield,
  Bell,
  Eye,
  CreditCard,
  BookOpen,
  Settings,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { READER_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Config
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { title: 'Profile', href: `${READER_ROUTES.settings}/profile`, icon: User },
  { title: 'Account', href: `${READER_ROUTES.settings}/account`, icon: Settings },
  { title: 'Security', href: `${READER_ROUTES.settings}/security`, icon: Shield },
  { title: 'Reading', href: `${READER_ROUTES.settings}/reading`, icon: BookOpen },
  { title: 'Notifications', href: `${READER_ROUTES.settings}/notifications`, icon: Bell },
  { title: 'Privacy', href: `${READER_ROUTES.settings}/privacy`, icon: Eye },
  { title: 'Billing', href: `${READER_ROUTES.settings}/billing`, icon: CreditCard },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150',
                'whitespace-nowrap',
                isActive
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors duration-150',
                  isActive
                    ? 'text-white dark:text-neutral-900'
                    : 'text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300'
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Danger Zone Link */}
      <div className="mt-6 hidden border-t border-neutral-200/60 pt-4 dark:border-neutral-800 lg:block">
        <Link
          href={`${READER_ROUTES.settings}/account#danger-zone`}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-neutral-400 transition-colors duration-150 hover:text-red-600 dark:text-neutral-500 dark:hover:text-red-400"
        >
          <span>Delete account</span>
        </Link>
      </div>
    </nav>
  );
}