// ==== FILE: src/app/unauthorized/page.tsx ====
/**
 * Unauthorized Page
 */

import { ShieldX } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES, READER_ROUTES } from '@/lib/constants/routes';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <ShieldX className="h-16 w-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You don&apos;t have permission to access this page.</p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href={PUBLIC_ROUTES.home}>Go Home</Link>
          </Button>
          <Button asChild>
            <Link href={READER_ROUTES.dashboard}>Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}