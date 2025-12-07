// ==== FILE: src/app/(marketing)/become-author/page.tsx ====
/**
 * Become an Author Page
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  DollarSign,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  LogIn,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth, useAuthorAccount } from '@/hooks';
import { AUTH_ROUTES, AUTHOR_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: BookOpen,
    title: 'Host your stories',
    description: 'Create series, chapters, and standalone works under your own brand.',
  },
  {
    icon: DollarSign,
    title: 'Earn from your writing',
    description: 'Subscriptions, one-time purchases, and more (coming with monetization module).',
  },
  {
    icon: Users,
    title: 'Build your audience',
    description: 'Collect subscribers and engage fans across multiple sites.',
  },
] as const;

const STEPS = [
  {
    title: '1. Become an author',
    description: 'Upgrade your reader account to an author account with one click.',
  },
  {
    title: '2. Create your site',
    description: 'Set up your branded storefront, choose a theme, and customize your presence.',
  },
  {
    title: '3. Publish & grow',
    description: 'Publish stories, engage readers, and (soon) manage subscriptions and sales.',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BecomeAuthorPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { account, register, isRegistering } = useAuthorAccount();

  const isAlreadyAuthor = user?.role === 'AUTHOR' || !!account;

  const handleBecomeAuthor = () => {
    if (!isAuthenticated) {
      const redirect = encodeURIComponent('/become-author');
      router.push(`${AUTH_ROUTES.login}?redirect=${redirect}`);
      return;
    }

    if (isAlreadyAuthor) {
      router.push(AUTHOR_ROUTES.dashboard);
      return;
    }

    // ✅ Pass empty object or required data based on your hook's signature
    register({});
    
    // Or if the hook expects specific data:
    // register({ userId: user.id });
  };

  const getButtonContent = () => {
    if (isRegistering) {
      return (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
          Creating your author account...
        </>
      );
    }
    if (isAlreadyAuthor) {
      return (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Go to Author Dashboard
        </>
      );
    }
    if (isAuthenticated) {
      return (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Become an Author
        </>
      );
    }
    return (
      <>
        <LogIn className="mr-2 h-4 w-4" />
        Log in to Get Started
      </>
    );
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      {/* Hero */}
      <section className="space-y-6 text-center">
        <Badge className="mx-auto w-fit" variant="secondary">
          Own Your Universe
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Become an Author on Ownverso
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Turn your stories into a sustainable career. Create branded sites, grow your audience,
          and control how you publish and monetize your work.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={handleBecomeAuthor} disabled={isRegistering}>
            {getButtonContent()}
          </Button>

          {!isAuthenticated && (
            <Button variant="ghost" asChild>
              <Link href={AUTH_ROUTES.register}>
                New here? Create an account
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="grid gap-6 md:grid-cols-3">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card key={benefit.title}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2 text-base">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {benefit.description}
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.title}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}