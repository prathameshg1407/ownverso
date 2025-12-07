// ==== FILE: src/app/(author)/sites/[siteId]/settings/analytics/_components/analytics-settings-form.tsx ====
/**
 * Analytics Settings Form
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { BarChart3, ExternalLink, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useSiteSettings } from '@/hooks';
import {
  updateSiteAnalyticsSchema,
  type UpdateSiteAnalyticsFormData,
} from '@/lib/validation/site.schema';

interface AnalyticsSettingsFormProps {
  siteId: string;
}

export function AnalyticsSettingsForm({ siteId }: AnalyticsSettingsFormProps) {
  const { settings, isLoading, updateAnalytics, isUpdatingAnalytics } = useSiteSettings(siteId);

  const form = useForm<UpdateSiteAnalyticsFormData>({
    resolver: zodResolver(updateSiteAnalyticsSchema),
    defaultValues: {
      googleAnalyticsId: '',
      analyticsEnabled: true,
    },
  });

  useEffect(() => {
    if (settings?.analytics) {
      form.reset({
        googleAnalyticsId: settings.analytics.googleAnalyticsId ?? '',
        analyticsEnabled: settings.analytics.analyticsEnabled,
      });
    }
  }, [settings, form]);

  const onSubmit = (data: UpdateSiteAnalyticsFormData) => {
    updateAnalytics(data);
  };

  if (isLoading) {
    return <AnalyticsSettingsSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Built-in Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Built-in Analytics</CardTitle>
            <CardDescription>
              Ownverso's native analytics tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="analyticsEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Analytics</FormLabel>
                    <FormDescription>
                      Track page views, visitors, and engagement
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Alert>
              <BarChart3 className="h-4 w-4" />
              <AlertTitle>Privacy-friendly tracking</AlertTitle>
              <AlertDescription>
                We use privacy-respecting analytics that don&apos;t require cookie consent.
                No personal data is collected.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Google Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Google Analytics</CardTitle>
            <CardDescription>
              Connect your Google Analytics account for advanced tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="googleAnalyticsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Measurement ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </FormControl>
                  <FormDescription>
                    Find this in your Google Analytics dashboard under Admin → Data Streams
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="outline" asChild>
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Google Analytics
              </a>
            </Button>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isUpdatingAnalytics}>
              {isUpdatingAnalytics && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function AnalyticsSettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}