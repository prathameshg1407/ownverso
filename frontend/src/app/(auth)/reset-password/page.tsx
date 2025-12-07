// ==== FILE: src/app/(auth)/reset-password/page.tsx ====
/**
 * Reset Password Page
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ResetPasswordForm } from './_components/reset-password-form';
import { AuthFormSkeleton } from '../_components/auth-form-skeleton';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account',
};

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create new password</h1>
        <p className="mt-2 text-muted-foreground">Enter your new password below</p>
      </div>
      <Suspense fallback={<AuthFormSkeleton />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}