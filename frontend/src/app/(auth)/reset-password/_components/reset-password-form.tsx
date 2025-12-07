// ==== FILE: src/app/(auth)/reset-password/_components/reset-password-form.tsx ====
/**
 * Reset Password Form
 */

'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

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

import { authApi } from '@/lib/api/endpoints';
import { formatError } from '@/lib/api/error-handler';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validation/auth.schema';
import { AUTH_ROUTES } from '@/lib/constants/routes';
import { PasswordStrengthIndicator } from '../../_components/password-strength';

// ─────────────────────────────────────────────────────────────────────────────
// Invalid Token State
// ─────────────────────────────────────────────────────────────────────────────

function InvalidTokenState({ onRequestNew }: { onRequestNew: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Invalid reset link</h2>
        <p className="text-sm text-muted-foreground">
          This password reset link is invalid or has expired.
        </p>
      </div>
      <Button className="w-full" onClick={onRequestNew}>
        Request new reset link
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Form
// ─────────────────────────────────────────────────────────────────────────────

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const password = form.watch('newPassword');

  if (!token) {
    return <InvalidTokenState onRequestNew={() => router.push(AUTH_ROUTES.forgotPassword)} />;
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    try {
      await authApi.resetPassword({ token, newPassword: data.newPassword });
      toast.success('Password reset successfully');
      router.push(`${AUTH_ROUTES.login}?reset=1`);
    } catch (error) {
      toast.error(formatError(error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <PasswordStrengthIndicator password={password ?? ''} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            'Reset password'
          )}
        </Button>
      </form>
    </Form>
  );
}