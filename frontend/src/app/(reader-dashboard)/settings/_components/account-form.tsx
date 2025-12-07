// ==== FILE: src/app/(reader-dashboard)/settings/_components/account-form.tsx ====
/**
 * Account Form Component
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, AtSign, User, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useUser } from '@/hooks';
import { authApi } from '@/lib/api/endpoints';
import { REGEX } from '@/lib/constants/config';

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const accountSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(100, 'Display name must be less than 100 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(REGEX.username, 'Username can only contain letters, numbers, and underscores'),
});

type AccountFormData = z.infer<typeof accountSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface AccountFormProps {
  initialData: {
    email: string;
    username: string;
    displayName: string;
  };
  emailVerified: boolean;
}

export function AccountForm({ initialData, emailVerified }: AccountFormProps) {
  const { updateUser, isUpdating } = useUser();
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      displayName: initialData.displayName,
      username: initialData.username,
    },
  });

  const onSubmit = useCallback(
    (data: AccountFormData) => {
      updateUser(data);
    },
    [updateUser]
  );

  const handleResendVerification = useCallback(async () => {
    setIsResendingEmail(true);
    try {
      await authApi.resendVerificationEmail();
      toast.success('Verification email sent', { description: 'Please check your inbox.' });
    } catch {
      toast.error('Failed to send verification email');
    } finally {
      setIsResendingEmail(false);
    }
  }, []);

  const isDirty = form.formState.isDirty;

  return (
    <div className="space-y-6">
      {/* Email Verification Alert */}
      {!emailVerified && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Your email is not verified. Some features may be limited.</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResendVerification}
              disabled={isResendingEmail}
            >
              {isResendingEmail && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Resend Email
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Email (Read-only) */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={initialData.email} disabled className="bg-muted pl-10" />
        </div>
        <p className="text-sm text-muted-foreground">
          To change your email, use the{' '}
          <Button variant="link" className="h-auto p-0" asChild>
            <a href="/settings/security">security settings</a>
          </Button>
          .
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input {...field} placeholder="Your display name" className="pl-10" />
                  </div>
                </FormControl>
                <FormDescription>
                  This is how your name appears across the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input {...field} placeholder="username" className="pl-10" />
                  </div>
                </FormControl>
                <FormDescription>
                  Your unique username. This is used in your profile URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isUpdating || !isDirty}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}