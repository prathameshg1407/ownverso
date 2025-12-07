// ==== FILE: src/app/(author)/sites/[siteId]/settings/seo/_components/seo-settings-form.tsx ====
/**
 * SEO Settings Form
 */

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Search, Image } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import { useSiteSettings } from '@/hooks';
import {
  updateSiteSeoSchema,
  type UpdateSiteSeoFormData,
} from '@/lib/validation/site.schema';

interface SeoSettingsFormProps {
  siteId: string;
}

export function SeoSettingsForm({ siteId }: SeoSettingsFormProps) {
  const { settings, isLoading, updateSeo, isUpdatingSeo } = useSiteSettings(siteId);

  const form = useForm<UpdateSiteSeoFormData>({
    resolver: zodResolver(updateSiteSeoSchema),
    defaultValues: {
      metaTitle: '',
      metaDescription: '',
      ogImageUrl: '',
    },
  });

  useEffect(() => {
    if (settings?.seo) {
      form.reset({
        metaTitle: settings.seo.metaTitle ?? '',
        metaDescription: settings.seo.metaDescription ?? '',
        ogImageUrl: settings.seo.ogImageUrl ?? '',
      });
    }
  }, [settings, form]);

  const onSubmit = (data: UpdateSiteSeoFormData) => {
    updateSeo(data);
  };

  if (isLoading) {
    return <SeoSettingsSkeleton />;
  }

  const metaTitle = form.watch('metaTitle');
  const metaDescription = form.watch('metaDescription');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Meta Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Search Engine Optimization</CardTitle>
            <CardDescription>
              Control how your site appears in search results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="Your Site Name | Tagline"
                      maxLength={60}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value?.length ?? 0)}/60 characters — Appears in browser tabs and search results
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ''}
                      placeholder="A brief description of your site for search engines..."
                      rows={3}
                      maxLength={160}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value?.length ?? 0)}/160 characters — Shown below the title in search results
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Share Image (OG Image)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="https://example.com/og-image.jpg"
                    />
                  </FormControl>
                  <FormDescription>
                    Image shown when your site is shared on social media (1200x630px recommended)
                  </FormDescription>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-2 overflow-hidden rounded-lg border">
                      <img
                        src={field.value}
                        alt="OG Image preview"
                        className="aspect-[1200/630] w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Search Preview</CardTitle>
            <CardDescription>
              How your site might appear in Google search results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <span>ownverso.com</span>
                <span>›</span>
                <span>s/{siteId}</span>
              </div>
              <h3 className="mt-1 text-xl text-blue-800 hover:underline">
                {metaTitle || settings?.general.name || 'Your Site Title'}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {metaDescription || 'Add a meta description to improve your search visibility...'}
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isUpdatingSeo}>
              {isUpdatingSeo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function SeoSettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-80 animate-pulse rounded-lg bg-muted" />
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}