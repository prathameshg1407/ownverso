// ==== FILE: src/app/(marketing)/page.tsx ====
/**
 * Home Page
 */

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, TrendingUp, Zap, Shield, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AUTH_ROUTES, PUBLIC_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Config
// ─────────────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Publish Anything',
    description:
      'Novels, comics, manga, webtoons, short stories - publish any format with our flexible content system.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Build Your Community',
    description:
      'Engage with readers through comments, forums, and announcements. Build a loyal fanbase.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Monetize Your Work',
    description: 'Flexible monetization with subscriptions, chapter sales, tips, and merchandise.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'AI-Powered Tools',
    description: 'Writing assistance, translation, cover generation, and more powered by AI.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Content Protection',
    description: 'Protect your work with watermarking, DRM, and piracy detection.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global Reach',
    description: 'Reach readers worldwide with multi-language support and localized payments.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Publish Your Stories.{' '}
              <span className="gradient-text">Build Your Audience.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The modern platform for authors to publish novels, comics, and stories. Monetize
              your content with subscriptions, tips, and one-time purchases.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={AUTH_ROUTES.register}>
                  Start Writing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/discover">Discover Stories</Link>
              </Button>
            </div>
          </div>
        </div>
        <HeroBackground />
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful tools designed for modern storytellers
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-20 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of authors already publishing on Ownverso
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={AUTH_ROUTES.register}>
                  Create Your Site
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={PUBLIC_ROUTES.pricing}>View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}