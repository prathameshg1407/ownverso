// ==== FILE: src/components/auth/user-menu.tsx ====
/**
 * User Menu Component
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Settings, BookOpen, CreditCard, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { READER_ROUTES, AUTHOR_ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface MenuItemProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MenuItem({ href, onClick, icon, children, disabled }: MenuItemProps) {
  const className = cn(
    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {icon}
      {children}
    </button>
  );
}

function MenuDivider() {
  return <div className="h-px bg-border my-1" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function UserMenu() {
  const { user, logout, isLoggingOut } = useAuth();
  const { isAuthor, isAdmin } = usePermissions();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    closeMenu();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-muted/80"
        aria-label="User menu"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.displayName} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="text-sm font-medium">{user.displayName.charAt(0).toUpperCase()}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeMenu} />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user.displayName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            <MenuDivider />

            <MenuItem href={READER_ROUTES.library} onClick={closeMenu} icon={<BookOpen className="h-4 w-4" />}>
              My Library
            </MenuItem>

            {(isAuthor || isAdmin) && (
              <MenuItem href={AUTHOR_ROUTES.dashboard} onClick={closeMenu} icon={<User className="h-4 w-4" />}>
                Author Dashboard
              </MenuItem>
            )}

            <MenuItem href={READER_ROUTES.settings} onClick={closeMenu} icon={<CreditCard className="h-4 w-4" />}>
              Billing
            </MenuItem>

            <MenuItem href={READER_ROUTES.settings} onClick={closeMenu} icon={<Settings className="h-4 w-4" />}>
              Settings
            </MenuItem>

            <MenuDivider />

            <MenuItem onClick={toggleTheme} icon={theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </MenuItem>

            <MenuDivider />

            <MenuItem
              onClick={() => {
                logout();
                closeMenu();
              }}
              disabled={isLoggingOut}
              icon={<LogOut className="h-4 w-4" />}
            >
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </MenuItem>
          </div>
        </>
      )}
    </div>
  );
}