// ==== FILE: src/app/(auth)/forgot-password/_components/forgot-password-form.tsx ====
/**
 * Forgot Password Form
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useAuth } from '@/hooks';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validation/auth.schema';
import { AUTH_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Success State
// ─────────────────────────────────────────────────────────────────────────────

interface SuccessStateProps {
  email: string;
  onReset: () => void;
}

function SuccessState({ email, onReset }: SuccessStateProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to{' '}
          <span className="font-medium">{email}</span>
        </p>
      </div>
      <div className="space-y-2 pt-4">
        <button
          onClick={onReset}
          className="w-full text-sm text-primary hover:underline"
        >
          Didn&apos;t receive the email? Try again
        </button>
        <Link
          href={AUTH_ROUTES.login}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Form
// ─────────────────────────────────────────────────────────────────────────────

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const { forgotPassword, isSendingResetEmail } = useAuth();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data);
      setSubmitted(data.email);
    } catch {
      // Error handled by hook
    }
  };

  const handleReset = () => {
    setSubmitted(null);
    form.reset();
  };

  if (submitted) {
    return <SuccessState email={submitted} onReset={handleReset} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isSendingResetEmail}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSendingResetEmail} size="lg">
          {isSendingResetEmail ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send reset link'
          )}
        </Button>

        <Link
          href={AUTH_ROUTES.login}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </form>
    </Form>
  );
}