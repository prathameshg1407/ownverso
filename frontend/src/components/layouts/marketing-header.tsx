// ==== FILE: src/components/layouts/marketing-header.tsx ====
/**
 * Marketing Header Component
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { cn } from '@/lib/utils';
import { AUTH_ROUTES, PUBLIC_ROUTES, READER_ROUTES, AUTHOR_ROUTES, ADMIN_ROUTES } from '@/lib/constants/routes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Features', href: PUBLIC_ROUTES.features },
  { label: 'Pricing', href: PUBLIC_ROUTES.pricing },
  { label: 'About', href: PUBLIC_ROUTES.about },
  { label: 'Blog', href: PUBLIC_ROUTES.blog },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getInitials(name?: string | null): string {
  if (!name?.trim()) return 'U';
  return name.trim().split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
}

function getDisplayName(user: { displayName?: string | null; username?: string | null; email?: string | null } | null): string {
  return user?.displayName || user?.username || user?.email?.split('@')[0] || 'User';
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
        <span className="text-sm font-bold text-background">N</span>
      </div>
      <span className="text-lg font-semibold tracking-tight">NovelHub</span>
    </Link>
  );
}

function UserMenu() {
  const { user, logout, isLoggingOut } = useAuth();
  const { isAuthor, isAdmin } = usePermissions();

  if (!user) return null;

  const displayName = getDisplayName(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={user.avatarUrl || undefined} alt={displayName} />
            <AvatarFallback className="bg-muted text-sm font-medium">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border border-border/50 bg-background/95 p-1.5 backdrop-blur-xl"
        sideOffset={8}
      >
        <div className="px-3 py-2.5">
          <p className="text-sm font-medium">{displayName}</p>
          {user.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
        </div>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem asChild className="rounded-lg">
          <Link href={READER_ROUTES.library}>Library</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-lg">
          <Link href={READER_ROUTES.settings}>Settings</Link>
        </DropdownMenuItem>

        {isAuthor && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href={AUTHOR_ROUTES.dashboard}>Author Dashboard</Link>
            </DropdownMenuItem>
          </>
        )}

        {isAdmin && (
          <DropdownMenuItem asChild className="rounded-lg">
            <Link href={ADMIN_ROUTES.dashboard}>Admin</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="rounded-lg text-muted-foreground focus:text-foreground"
        >
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthButtons() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-9 w-16 animate-pulse rounded-lg bg-muted" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (isAuthenticated) return <UserMenu />;

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
        <Link href={AUTH_ROUTES.login}>Sign in</Link>
      </Button>
      <Button size="sm" asChild className="rounded-full bg-foreground px-4 text-background hover:bg-foreground/90">
        <Link href={AUTH_ROUTES.register}>
          Get Started
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
}

function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'px-3.5 py-2 text-sm font-medium transition-colors',
            pathname === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { isAuthenticated, user, logout, isLoggingOut } = useAuth();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const displayName = getDisplayName(user);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background border-l">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <span className="text-sm font-medium">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)]">
          {/* User Info */}
          {isAuthenticated && user && (
            <div className="px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={user.avatarUrl || undefined} />
                  <AvatarFallback className="text-sm">{getInitials(displayName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  pathname === link.href
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className="my-3 border-t" />
                <Link
                  href={READER_ROUTES.library}
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground"
                >
                  Library
                </Link>
                <Link
                  href={READER_ROUTES.settings}
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground"
                >
                  Settings
                </Link>
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                onClick={() => logout()}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Signing out...' : 'Sign out'}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href={AUTH_ROUTES.register}>Get Started</Link>
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={AUTH_ROUTES.login}>Sign in</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

interface MarketingHeaderProps {
  className?: string;
  transparent?: boolean;
}

export function MarketingHeader({ className, transparent = false }: MarketingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const showBackground = !transparent || scrolled;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          showBackground ? 'bg-background/80 backdrop-blur-xl border-b border-border/40' : 'bg-transparent',
          className
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <DesktopNav />

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <AuthButtons />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}

export default MarketingHeader;