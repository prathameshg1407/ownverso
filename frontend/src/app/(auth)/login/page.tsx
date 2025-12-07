// ==== FILE: src/app/(auth)/login/page.tsx ====
/**
 * Login Page
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';

import { LoginForm } from './_components/login-form';
import { AuthFormSkeleton } from '../_components/auth-form-skeleton';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">Login to your account to continue</p>
      </div>
      <Suspense fallback={<AuthFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}