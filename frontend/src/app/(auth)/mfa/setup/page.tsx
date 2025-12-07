// ==== FILE: src/app/(auth)/mfa/setup/page.tsx ====
/**
 * MFA Setup Page
 */

import type { Metadata } from 'next';

import { MfaSetupForm } from './_components/mfa-setup-form';

export const metadata: Metadata = {
  title: 'Two-Factor Authentication Setup',
  description: 'Secure your account with two-factor authentication',
};

export default function MfaSetupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
        <p className="mt-2 text-muted-foreground">Add an extra layer of security to your account</p>
      </div>
      <MfaSetupForm />
    </div>
  );
}