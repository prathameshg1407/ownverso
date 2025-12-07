// ==== FILE: src/app/(auth)/register/page.tsx ====
/**
 * Register Page
 */

import type { Metadata } from 'next';

import { RegisterForm } from './_components/register-form';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your account',
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-muted-foreground">Join and start your journey</p>
      </div>
      <RegisterForm />
    </div>
  );
}