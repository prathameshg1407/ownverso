// ==== FILE: src/app/(author)/sites/[siteId]/settings/branding/_components/branding-settings-form.tsx ====
/**
 * Branding Settings Form
 */

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';

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
import { useSiteSettings } from '@/hooks';
import {
  updateSiteBrandingSchema,
  type UpdateSiteBrandingFormData,
} from '@/lib/validation/site.schema';
import { cn } from '@/lib/utils';

interface BrandingSettingsFormProps {
  siteId: string;
}

export function BrandingSettingsForm({ siteId }: BrandingSettingsFormProps) {
  const { settings, isLoading, updateBranding, isUpdatingBranding } = useSiteSettings(siteId);

  const form = useForm<UpdateSiteBrandingFormData>({
    resolver: zodResolver(updateSiteBrandingSchema),
    defaultValues: {
      logoUrl: '',
      faviconUrl: '',
      coverImageUrl: '',
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#f59e0b',
    },
  });

  useEffect(() => {
    if (settings?.branding) {
      form.reset({
        logoUrl: settings.branding.logoUrl ?? '',
        faviconUrl: settings.branding.faviconUrl ?? '',
        coverImageUrl: settings.branding.coverImageUrl ?? '',
        primaryColor: settings.branding.primaryColor ?? '#6366f1',
        secondaryColor: settings.branding.secondaryColor ?? '#8b5cf6',
        accentColor: settings.branding.accentColor ?? '#f59e0b',
      });
    }
  }, [settings, form]);

  const onSubmit = (data: UpdateSiteBrandingFormData) => {
    updateBranding(data);
  };

  if (isLoading) {
    return <SettingsFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>
              Your site's visual identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="https://example.com/logo.png"
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended size: 200x200px
                  </FormDescription>
                  <FormMessage />
                  {field.value && (
                    <ImagePreview src={field.value} alt="Logo preview" />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="faviconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="https://example.com/favicon.ico"
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended size: 32x32px
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </FormControl>
                  <FormDescription>
                    Used as a hero banner. Recommended size: 1920x600px
                  </FormDescription>
                  <FormMessage />
                  {field.value && (
                    <ImagePreview src={field.value} alt="Cover preview" className="aspect-[16/5]" />
                  )}
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>
              Customize your site's color scheme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={field.value ?? '#6366f1'}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded border"
                        />
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="#6366f1"
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={field.value ?? '#8b5cf6'}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded border"
                        />
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="#8b5cf6"
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={field.value ?? '#f59e0b'}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="h-10 w-12 cursor-pointer rounded border"
                        />
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="#f59e0b"
                          className="flex-1"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Color Preview */}
            <div className="rounded-lg border p-4">
              <p className="mb-3 text-sm font-medium">Preview</p>
              <div className="flex gap-4">
                <div
                  className="h-16 w-16 rounded"
                  style={{ backgroundColor: form.watch('primaryColor') ?? '#6366f1' }}
                />
                <div
                  className="h-16 w-16 rounded"
                  style={{ backgroundColor: form.watch('secondaryColor') ?? '#8b5cf6' }}
                />
                <div
                  className="h-16 w-16 rounded"
                  style={{ backgroundColor: form.watch('accentColor') ?? '#f59e0b' }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isUpdatingBranding}>
              {isUpdatingBranding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

function ImagePreview({ src, alt, className }: ImagePreviewProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn('mt-2 flex items-center justify-center rounded-lg border bg-muted p-4', className)}>
        <span className="text-sm text-muted-foreground">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn('relative mt-2 overflow-hidden rounded-lg border', className)}>
      <img
        src={src}
        alt={alt}
        className="h-auto w-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

function SettingsFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-80 animate-pulse rounded-lg bg-muted" />
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}