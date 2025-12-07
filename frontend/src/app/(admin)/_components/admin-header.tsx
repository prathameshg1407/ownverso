// ==== FILE: src/app/(admin)/_components/admin-header.tsx ====
/**
 * Admin Header Component
 */

'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

import { UserMenu } from '@/components/auth/user-menu';
import { Badge } from '@/components/ui/badge';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/lib/constants/routes';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <Link href={ADMIN_ROUTES.dashboard} className="mr-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-xl font-bold">Admin</span>
          <Badge variant="secondary" className="text-xs">
            Ownverso
          </Badge>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href={PUBLIC_ROUTES.home}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View Site
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}