// ==== FILE: src/app/(reader-dashboard)/settings/page.tsx ====

'use client';

import Link from 'next/link';
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  CreditCard, 
  BookOpen, 
  Settings,
  ChevronRight,
  type LucideIcon 
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useUser, useUserSecurity } from '@/hooks';
import { READER_ROUTES } from '@/lib/constants/routes';
import type { FullUser, UserSecurityInfo } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SettingsCard {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  getStatus?: (user: FullUser | undefined, security: UserSecurityInfo | undefined) => {
    label: string;
    type: 'success' | 'warning' | 'neutral';
  } | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const SETTINGS_CARDS: SettingsCard[] = [
  {
    title: 'Profile',
    description: 'Your public profile and avatar',
    href: READER_ROUTES.settingsProfile,
    icon: User,
    getStatus: (user) => user?.profile?.avatarUrl ? null : { label: 'Incomplete', type: 'warning' },
  },
  {
    title: 'Account',
    description: 'Email, username, and display name',
    href: READER_ROUTES.settingsAccount,
    icon: Settings,
    getStatus: (user) => user?.emailVerified ? null : { label: 'Verify email', type: 'warning' },
  },
  {
    title: 'Security',
    description: 'Password and two-factor auth',
    href: READER_ROUTES.settingsSecurity,
    icon: Shield,
    getStatus: (_, security) => security?.mfaEnabled 
      ? { label: 'MFA enabled', type: 'success' } 
      : { label: 'Add MFA', type: 'warning' },
  },
  {
    title: 'Reading',
    description: 'Content preferences and settings',
    href: READER_ROUTES.settingsReading,
    icon: BookOpen,
  },
  {
    title: 'Notifications',
    description: 'Email and push notifications',
    href: READER_ROUTES.settingsNotifications,
    icon: Bell,
  },
  {
    title: 'Privacy',
    description: 'Control your visibility',
    href: READER_ROUTES.settingsPrivacy,
    icon: Eye,
  },
  {
    title: 'Billing',
    description: 'Subscriptions and payments',
    href: READER_ROUTES.settingsBilling,
    icon: CreditCard,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-muted', className)} />;
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 text-lg font-semibold">{value}</p>
    </div>
  );
}

function SettingsLink({ card, user, security }: { 
  card: SettingsCard; 
  user?: FullUser; 
  security?: UserSecurityInfo;
}) {
  const Icon = card.icon;
  const status = card.getStatus?.(user, security);

  return (
    <Link
      href={card.href}
      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background p-4 transition-all hover:border-border hover:shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{card.title}</span>
          {status && (
            <span className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
              status.type === 'success' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
              status.type === 'warning' && 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
              status.type === 'neutral' && 'bg-muted text-muted-foreground'
            )}>
              {status.label}
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {card.description}
        </p>
      </div>
      
      <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { user, isLoading: isLoadingUser } = useUser();
const { security, isLoadingSecurity } = useUserSecurity();
  const isLoading = isLoadingUser || isLoadingSecurity;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
        <div className="grid gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-[72px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard 
          label="Status" 
          value={
            <span className={cn(
              'inline-flex items-center gap-1.5',
              user?.status === 'ACTIVE' && 'text-emerald-600 dark:text-emerald-400'
            )}>
              <span className="h-2 w-2 rounded-full bg-current" />
              {user?.status || 'Unknown'}
            </span>
          } 
        />
        <StatCard 
          label="Member since" 
          value={user?.createdAt 
            ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })
            : '-'
          } 
        />
        <StatCard 
          label="Account type" 
          value={<span className="capitalize">{user?.role?.toLowerCase() || 'Reader'}</span>} 
        />
      </div>

      {/* Settings Links */}
      <div className="grid gap-3">
        {SETTINGS_CARDS.map((card) => (
          <SettingsLink 
            key={card.href} 
            card={card} 
            user={user} 
            security={security} 
          />
        ))}
      </div>
    </div>
  );
}