// ==== FILE: src/components/auth/auth-guard.tsx ====
/**
 * Auth Guard Component
 * Protects routes requiring authentication
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useAuthStore } from '@/lib/stores/auth.store';
import { useSession } from '@/hooks/use-session';
import { AUTH_ROUTES } from '@/lib/constants/routes';
import { Spinner } from '@/components/ui/spinner';
import type { UserRole } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

function DefaultFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export function AuthGuard({ children, requiredRoles, fallback }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useSession();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      const redirectUrl = encodeURIComponent(pathname || '/');
      router.push(`${AUTH_ROUTES.login}?redirect=${redirectUrl}`);
      return;
    }

    if (requiredRoles?.length && user && !requiredRoles.includes(user.role as UserRole)) {
      router.push('/unauthorized');
    }
  }, [isAuthenticated, isLoading, router, pathname, user, requiredRoles]);

  if (isLoading || !isAuthenticated) {
    return fallback ?? <DefaultFallback />;
  }

  if (requiredRoles?.length && user && !requiredRoles.includes(user.role as UserRole)) {
    return null;
  }

  return <>{children}</>;
}