// ==== FILE: src/app/(auth)/login/_components/login-form.tsx ====
/**
 * Login Form
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useAuth } from '@/hooks';
import { loginSchema, type LoginFormData } from '@/lib/validation/auth.schema';
import { AUTH_ROUTES } from '@/lib/constants/routes';
import { SocialLoginButtons } from '../../_components/social-login-buttons';

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const sessionExpired = searchParams.get('session_expired') === 'true';
  const verified = searchParams.get('verified') === 'true';

  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();
  const isSubmittingRef = useRef(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrUsername: '', password: '', rememberMe: false },
    mode: 'onBlur',
  });

  // Show toast notifications for special states
  useEffect(() => {
    if (sessionExpired) {
      toast.warning('Your session has expired. Please log in again.');
    }
    if (verified) {
      toast.success('Email verified successfully! You can now log in.');
    }
  }, [sessionExpired, verified]);

  // Auto-focus first field
  useEffect(() => {
    form.setFocus('emailOrUsername');
  }, [form]);

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      if (isSubmittingRef.current || isLoggingIn) return;
      isSubmittingRef.current = true;

      try {
        await new Promise<void>((resolve, reject) => {
          login(data, {
            onSuccess: () => resolve(),
            onError: reject,
            onSettled: () => {
              isSubmittingRef.current = false;
            },
          });
        });
      } catch {
        isSubmittingRef.current = false;
      }
    },
    [login, isLoggingIn]
  );

  const isDisabled = form.formState.isSubmitting || isLoggingIn;

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {sessionExpired && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
      )}

      {verified && (
        <Alert className="border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Email verified successfully! You can now log in.</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField
            control={form.control}
            name="emailOrUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your email or username"
                    autoComplete="username"
                    disabled={isDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href={AUTH_ROUTES.forgotPassword}
                    className="text-sm text-muted-foreground hover:text-primary"
                    tabIndex={-1}
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isDisabled}
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isDisabled}
                    id="rememberMe"
                  />
                </FormControl>
                <Label htmlFor="rememberMe" className="cursor-pointer text-sm font-normal">
                  Remember me for 30 days
                </Label>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isDisabled} size="lg">
            {isDisabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href={
                redirect
                  ? `${AUTH_ROUTES.register}?redirect=${encodeURIComponent(redirect)}`
                  : AUTH_ROUTES.register
              }
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </Form>

      <SocialLoginButtons disabled={isDisabled} />
    </div>
  );
}