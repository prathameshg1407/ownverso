// ==== FILE: src/app/(auth)/collaborator/accept/page.tsx ====
/**
 * Accept Collaborator Invite Page
 * URL format: /collaborator/accept?token=xxx
 */

'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, LogIn, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks';
import { useCollaboratorInvite } from '@/hooks/use-site-collaborators';
import { AUTH_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Helper Component
// ─────────────────────────────────────────────────────────────────────────────

interface CenterCardProps {
  icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  title: string;
  children: React.ReactNode;
}

function CenterCard({ icon: Icon, iconClassName, title, children }: CenterCardProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Icon className={iconClassName || 'h-6 w-6 text-muted-foreground'} />
          </div>
          <CardTitle className="text-center text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading Fallback
// ─────────────────────────────────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <CenterCard 
      icon={Loader2} 
      iconClassName="h-6 w-6 animate-spin text-primary" 
      title="Loading..."
    >
      <p className="text-sm text-muted-foreground">
        Please wait while we load the invitation.
      </p>
    </CenterCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner Component (uses useSearchParams)
// ─────────────────────────────────────────────────────────────────────────────

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { acceptInvite, isAccepting, isError, error, isSuccess } = useCollaboratorInvite();

  useEffect(() => {
    if (!token || !isAuthenticated || isAuthLoading || isAccepting || isSuccess || isError) return;

    acceptInvite(token);
  }, [token, isAuthenticated, isAuthLoading, isAccepting, isSuccess, isError, acceptInvite]);

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      router.push('/sites');
    }
  }, [isSuccess, router]);

  // Auth still loading
  if (isAuthLoading) {
    return (
      <CenterCard 
        icon={Loader2} 
        iconClassName="h-6 w-6 animate-spin text-primary" 
        title="Checking authentication..."
      >
        <p className="text-sm text-muted-foreground">
          Please wait while we verify your session.
        </p>
      </CenterCard>
    );
  }

  // Invalid token
  if (!token) {
    return (
      <CenterCard 
        icon={AlertCircle} 
        iconClassName="h-6 w-6 text-destructive" 
        title="Invalid invitation link"
      >
        <p className="text-sm text-muted-foreground">
          This invitation link is invalid or missing the token. Please check the URL or ask the site owner to
          resend the invite.
        </p>
        <Button variant="outline" onClick={() => router.push('/')}>
          Go to Home
        </Button>
      </CenterCard>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(`/collaborator/accept?token=${token}`);
    
    return (
      <CenterCard icon={LogIn} title="Log in to accept invite">
        <p className="text-sm text-muted-foreground">
          You need to log in to accept this collaboration invite.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => router.push(`${AUTH_ROUTES.login}?redirect=${redirectUrl}`)}>
            Log in
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push(`${AUTH_ROUTES.register}?redirect=${redirectUrl}`)}
          >
            Create account
          </Button>
        </div>
      </CenterCard>
    );
  }

  // Error state
  if (isError) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An error occurred while accepting the invitation.';
    
    return (
      <CenterCard 
        icon={AlertCircle} 
        iconClassName="h-6 w-6 text-destructive" 
        title="Failed to accept invite"
      >
        <p className="text-sm text-muted-foreground">
          {errorMessage}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => window.location.reload()}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => router.push('/sites')}>
            Go to Sites
          </Button>
        </div>
      </CenterCard>
    );
  }

  // Success state (brief moment before redirect)
  if (isSuccess) {
    return (
      <CenterCard 
        icon={CheckCircle2} 
        iconClassName="h-6 w-6 text-green-500" 
        title="Invitation accepted!"
      >
        <p className="text-sm text-muted-foreground">
          Redirecting you to your sites...
        </p>
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </CenterCard>
    );
  }

  // Processing
  return (
    <CenterCard 
      icon={Loader2} 
      iconClassName="h-6 w-6 animate-spin text-primary"
      title="Accepting invitation..."
    >
      <p className="text-sm text-muted-foreground">
        Please wait while we add you as a collaborator.
      </p>
    </CenterCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component (with Suspense boundary)
// ─────────────────────────────────────────────────────────────────────────────

export default function AcceptCollaboratorInvitePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AcceptInviteContent />
    </Suspense>
  );
}