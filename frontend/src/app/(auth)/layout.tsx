// ==== FILE: src/app/(auth)/layout.tsx ====
/**
 * Auth Layout
 */

import Link from 'next/link';

import { PUBLIC_ROUTES } from '@/lib/constants/routes';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={PUBLIC_ROUTES.home}
            className="text-2xl font-bold transition-opacity hover:opacity-80"
          >
            Ownverso
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ownverso. All rights reserved.
        </div>
      </footer>
    </div>
  );
}