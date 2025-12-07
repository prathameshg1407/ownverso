// ==== FILE: src/app/(author)/sites/[siteId]/settings/theme/_components/theme-settings-form.tsx ====
/**
 * Theme Settings Form
 */

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Check, Sparkles } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useSiteSettings, useThemes } from '@/hooks';
import {
  updateSiteThemeSchema,
  type UpdateSiteThemeFormData,
} from '@/lib/validation/site.schema';
import { cn } from '@/lib/utils';

interface ThemeSettingsFormProps {
  siteId: string;
}

export function ThemeSettingsForm({ siteId }: ThemeSettingsFormProps) {
  const { settings, isLoading, updateTheme, isUpdatingTheme } = useSiteSettings(siteId);
  const { themes, isLoading: isLoadingThemes } = useThemes();

  const form = useForm<UpdateSiteThemeFormData>({
    resolver: zodResolver(updateSiteThemeSchema),
    defaultValues: {
      themeId: null,
      customCssEnabled: false,
      customCss: '',
    },
  });

  useEffect(() => {
    if (settings?.theme) {
      form.reset({
        themeId: settings.theme.themeId,
        customCssEnabled: settings.theme.customCssEnabled,
        customCss: settings.theme.customCss ?? '',
      });
    }
  }, [settings, form]);

  const onSubmit = (data: UpdateSiteThemeFormData) => {
    updateTheme(data);
  };

  const selectedThemeId = form.watch('themeId');

  if (isLoading || isLoadingThemes) {
    return <ThemeSettingsSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Theme Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Choose a theme for your site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="themeId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Default theme option */}
                    <ThemeCard
                      name="Default"
                      description="Clean, minimal theme"
                      isSelected={!field.value}
                      onClick={() => field.onChange(null)}
                    />
                    
                    {/* Available themes */}
                    {themes.map((theme) => (
                      <ThemeCard
                        key={theme.id}
                        name={theme.name}
                        description={theme.slug}
                        thumbnailUrl={theme.thumbnailUrl}
                        isPremium={theme.isPremium}
                        requiredTier={theme.requiredTier}
                        isSelected={field.value === theme.id}
                        onClick={() => field.onChange(theme.id)}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Custom CSS */}
        <Card>
          <CardHeader>
            <CardTitle>Custom CSS</CardTitle>
            <CardDescription>
              Add your own styles to customize the theme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="customCssEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Custom CSS</FormLabel>
                    <FormDescription>
                      Apply custom styles to your site
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

            {form.watch('customCssEnabled') && (
              <FormField
                control={form.control}
                name="customCss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CSS Code</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''}
                        rows={12}
                        className="font-mono text-sm"
                        placeholder={`/* Your custom CSS */
.site-header {
  background: #fff;
}

.site-content {
  max-width: 1200px;
}`}
                      />
                    </FormControl>
                    <FormDescription>
                      Advanced users only. Invalid CSS may break your site.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isUpdatingTheme}>
              {isUpdatingTheme && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

interface ThemeCardProps {
  name: string;
  description?: string;
  thumbnailUrl?: string | null;
  isPremium?: boolean;
  requiredTier?: string | null;
  isSelected: boolean;
  onClick: () => void;
}

function ThemeCard({
  name,
  description,
  thumbnailUrl,
  isPremium,
  requiredTier,
  isSelected,
  onClick,
}: ThemeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-lg border-2 text-left transition-colors',
        isSelected
          ? 'border-primary ring-2 ring-primary ring-offset-2'
          : 'border-muted hover:border-primary/50'
      )}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-muted">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">{name}</span>
          {isPremium && (
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="mr-1 h-3 w-3" />
              Premium
            </Badge>
          )}
        </div>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-4 w-4" />
        </div>
      )}
    </button>
  );
}

function ThemeSettingsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}