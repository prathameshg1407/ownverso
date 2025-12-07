// ==== FILE: src/app/(author)/dashboard/_components/quick-actions.tsx ====
/**
 * Quick Actions Component
 */

'use client';

import Link from 'next/link';
import {
  Plus,
  FileText,
  Globe,
  Settings,
  ArrowRight,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AUTHOR_ROUTES } from '@/lib/constants/routes';

const actions = [
  {
    label: 'Create New Site',
    description: 'Start a new storefront for your content',
    href: AUTHOR_ROUTES.createSite,
    icon: Globe,
    variant: 'default' as const,
  },
  {
    label: 'Write Chapter',
    description: 'Add new content to your series',
    href: '/series',
    icon: FileText,
    variant: 'outline' as const,
  },
  {
    label: 'View Sites',
    description: 'Manage your existing sites',
    href: AUTHOR_ROUTES.sites,
    icon: Settings,
    variant: 'outline' as const,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              asChild
              variant={action.variant}
              className="w-full justify-between"
            >
              <Link href={action.href}>
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="flex flex-col items-start">
                    <span>{action.label}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {action.description}
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}