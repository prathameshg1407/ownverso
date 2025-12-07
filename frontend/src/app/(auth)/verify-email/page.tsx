// ==== FILE: src/app/(auth)/verify-email/page.tsx ====
/**
 * Verify Email Page
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';

import { VerificationStatus } from './_components/verification-status';

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address',
};

function VerificationLoader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="space-y-2 text-center">
        <div className="mx-auto h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="mx-auto h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerificationLoader />}>
      <VerificationStatus />
    </Suspense>
  );
}