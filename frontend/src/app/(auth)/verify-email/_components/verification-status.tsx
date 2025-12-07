// ==== FILE: src/app/(auth)/verify-email/_components/verification-status.tsx ====
/**
 * Verification Status Component
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, Mail, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api/endpoints';
import { formatError } from '@/lib/api/error-handler';
import { useAuthStore } from '@/lib/stores/auth.store';
import { AUTH_ROUTES, READER_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type VerificationState = 'verifying' | 'success' | 'error' | 'no-token';

// ─────────────────────────────────────────────────────────────────────────────
// State Components
// ─────────────────────────────────────────────────────────────────────────────

function VerifyingState() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Verifying your email...</h2>
        <p className="text-sm text-muted-foreground">
          Please wait while we verify your email address.
        </p>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Email verified!</h2>
        <p className="text-sm text-muted-foreground">
          Your email has been successfully verified. Redirecting...
        </p>
      </div>
      <div className="flex justify-center">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  canResend: boolean;
  onResend: () => void;
  isResending: boolean;
}

function ErrorState({ message, canResend, onResend, isResending }: ErrorStateProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Verification failed</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="space-y-2">
        {canResend && (
          <Button className="w-full" onClick={onResend} disabled={isResending}>
            {isResending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              'Resend verification email'
            )}
          </Button>
        )}
        <Button variant="outline" className="w-full" asChild>
          <Link href={AUTH_ROUTES.login}>Back to login</Link>
        </Button>
      </div>
    </div>
  );
}

interface NoTokenStateProps {
  canResend: boolean;
  onResend: () => void;
  isResending: boolean;
}

function NoTokenState({ canResend, onResend, isResending }: NoTokenStateProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900/20">
          <Mail className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification link to your email address.
        </p>
      </div>
      {canResend && (
        <Button className="w-full" onClick={onResend} disabled={isResending}>
          {isResending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Resending...
            </>
          ) : (
            'Resend verification email'
          )}
        </Button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function VerificationStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { user } = useAuthStore();

  const [state, setState] = useState<VerificationState>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  const verifyEmail = useCallback(async () => {
    if (!token) {
      setState('no-token');
      return;
    }

    setState('verifying');

    try {
      await authApi.verifyEmail({ token });
      setState('success');
      setTimeout(() => {
        router.push(user ? READER_ROUTES.library : `${AUTH_ROUTES.login}?verified=1`);
      }, 2500);
    } catch (error) {
      setErrorMessage(formatError(error).message);
      setState('error');
    }
  }, [router, token, user]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  const resendVerification = async () => {
    if (!user) {
      toast.error('Please log in to resend the verification email.');
      router.push(AUTH_ROUTES.login);
      return;
    }

    setIsResending(true);
    try {
      await authApi.resendVerificationEmail();
      toast.success('Verification email sent. Check your inbox.');
    } catch (error) {
      toast.error(formatError(error).message);
    } finally {
      setIsResending(false);
    }
  };

  switch (state) {
    case 'verifying':
      return <VerifyingState />;
    case 'success':
      return <SuccessState />;
    case 'error':
      return (
        <ErrorState
          message={errorMessage}
          canResend={!!user}
          onResend={resendVerification}
          isResending={isResending}
        />
      );
    case 'no-token':
      return (
        <NoTokenState
          canResend={!!user}
          onResend={resendVerification}
          isResending={isResending}
        />
      );
  }
}