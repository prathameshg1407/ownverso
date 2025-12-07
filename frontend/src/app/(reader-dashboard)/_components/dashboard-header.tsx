// ==== FILE: src/app/(reader-dashboard)/_components/dashboard-header.tsx ====
/**
 * Dashboard Header
 */

'use client';

import Link from 'next/link';
import { Bell, Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserMenu } from '@/components/auth/user-menu';
import { PUBLIC_ROUTES, READER_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface DashboardHeaderProps {
  variant?: 'reader' | 'author';
  onMenuClick?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardHeader({ variant = 'reader', onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <Link href={PUBLIC_ROUTES.home} className="mr-6 text-xl font-bold">
          Ownverso
        </Link>

        {/* Search */}
        <div className="max-w-md flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="w-full pl-10" />
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`${READER_ROUTES.dashboard}/notifications`}>
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}