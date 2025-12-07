// ==== FILE: src/app/(author)/sites/[siteId]/settings/general/_components/general-settings-form.tsx ====
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSiteSettings } from '@/hooks';
import {
  updateSiteGeneralSchema,
  type UpdateSiteGeneralFormData,
} from '@/lib/validation/site.schema';
import type { SiteStatus } from '@/types/api';

interface GeneralSettingsFormProps {
  siteId: string;
}

// Form-allowed statuses (excludes admin-only SUSPENDED)
type FormSiteStatus = 'DRAFT' | 'ACTIVE' | 'MAINTENANCE';

// Statuses that users can select
const USER_SELECTABLE_STATUSES: Array<{ value: FormSiteStatus; label: string }> = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
];

// Helper to get a valid form status (returns only form-allowed statuses)
function getFormStatus(status: SiteStatus | undefined): FormSiteStatus {
  if (!status) return 'DRAFT';
  // If suspended, show as draft in form (user can't change suspended status)
  if (status === 'SUSPENDED') return 'DRAFT';
  return status as FormSiteStatus;
}

export function GeneralSettingsForm({ siteId }: GeneralSettingsFormProps) {
  const { settings, isLoading, updateGeneral, isUpdatingGeneral } = useSiteSettings(siteId);
  
  const isSuspended = settings?.general?.status === 'SUSPENDED';

  const form = useForm<UpdateSiteGeneralFormData>({
    resolver: zodResolver(updateSiteGeneralSchema),
    defaultValues: {
      name: '',
      slug: '',
      tagline: '',
      description: '',
      status: 'DRAFT',
      isPublic: true,
      maintenanceMode: false,
      maintenanceMessage: '',
    },
  });

  // Populate form when settings load
  useEffect(() => {
    if (settings?.general) {
      form.reset({
        name: settings.general.name,
        slug: settings.general.slug,
        tagline: settings.general.tagline ?? '',
        description: settings.general.description ?? '',
        status: getFormStatus(settings.general.status),  // ✅ Now returns FormSiteStatus
        isPublic: settings.general.isPublic,
        maintenanceMode: settings.general.maintenanceMode,
        maintenanceMessage: settings.general.maintenanceMessage ?? '',
      });
    }
  }, [settings, form]);

  const onSubmit = (data: UpdateSiteGeneralFormData) => {
    updateGeneral(data);
  };

  if (isLoading) {
    return <SettingsFormSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Suspended Warning */}
        {isSuspended && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">
                This site has been suspended. Please contact support for assistance.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              The core details about your site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSuspended} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="rounded-l-md border border-r-0 bg-muted px-3 py-2 text-sm text-muted-foreground">
                        ownverso.com/s/
                      </span>
                      <Input {...field} className="rounded-l-none" disabled={isSuspended} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Changing this will break existing links
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled={isSuspended} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} rows={4} disabled={isSuspended} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Visibility</CardTitle>
            <CardDescription>
              Control who can see your site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isSuspended}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {USER_SELECTABLE_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Draft sites are only visible to you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Public Site</FormLabel>
                    <FormDescription>
                      Allow anyone to discover your site
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSuspended}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maintenanceMode"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Maintenance Mode</FormLabel>
                    <FormDescription>
                      Show a maintenance page to visitors
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSuspended}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch('maintenanceMode') && (
              <FormField
                control={form.control}
                name="maintenanceMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ''}
                        placeholder="We'll be back soon!"
                        rows={3}
                        disabled={isSuspended}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isUpdatingGeneral || isSuspended}>
              {isUpdatingGeneral && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function SettingsFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}