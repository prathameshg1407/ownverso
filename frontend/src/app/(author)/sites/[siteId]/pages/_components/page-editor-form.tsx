// ==== FILE: src/app/(author)/sites/[siteId]/pages/_components/page-editor-form.tsx ====
/**
 * Page Editor Form
 */

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
import { useSitePages, useSitePage } from '@/hooks';
import {
  createPageSchema,
  updatePageSchema,
  type CreatePageFormData,
  type UpdatePageFormData,
} from '@/lib/validation/site.schema';
import { slugify } from '@/lib/utils/string';

interface PageEditorFormProps {
  siteId: string;
  pageId?: string;
  mode: 'create' | 'edit';
}

export function PageEditorForm({ siteId, pageId, mode }: PageEditorFormProps) {
  const { createPage, isCreating } = useSitePages(siteId);
  const { page, updatePage, isUpdating, isLoading } = useSitePage(
    siteId,
    pageId ?? ''
  );

  const isEdit = mode === 'edit';
  const schema = isEdit ? updatePageSchema : createPageSchema;

  const form = useForm<CreatePageFormData | UpdatePageFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      slug: '',
      title: '',
      content: '',
      isPublished: false,
      showInNav: false,
      navLabel: '',
      navOrder: 0,
      metaTitle: '',
      metaDescription: '',
    },
  });

  // Populate form in edit mode
  useEffect(() => {
    if (isEdit && page) {
      form.reset({
        slug: page.slug,
        title: page.title,
        content: page.content,
        isPublished: page.isPublished,
        showInNav: page.showInNav,
        navLabel: page.navLabel ?? '',
        navOrder: page.navOrder,
        metaTitle: page.metaTitle ?? '',
        metaDescription: page.metaDescription ?? '',
      });
    }
  }, [page, isEdit, form]);

  const onSubmit = (data: CreatePageFormData | UpdatePageFormData) => {
    if (isEdit && pageId) {
      updatePage(data as UpdatePageFormData);
    } else {
      createPage(data as CreatePageFormData);
    }
  };

  // Auto-slug from title (create mode only)
  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    if (!isEdit && !form.formState.dirtyFields.slug) {
      form.setValue('slug', slugify(title));
    }
  };

  if (isEdit && isLoading) {
    return <PageEditorSkeleton />;
  }

  const isPending = isCreating || isUpdating;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
            <CardDescription>
              The main content of your page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="About Us"
                    />
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
                        /page/
                      </span>
                      <Input
                        {...field}
                        className="rounded-l-none"
                        placeholder="about-us"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={12}
                      placeholder="Write your page content here..."
                      className="font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    Supports Markdown formatting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Publishing */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Published</FormLabel>
                    <FormDescription>
                      Make this page visible to visitors
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

            // ==== FILE: src/app/(author)/sites/[siteId]/pages/_components/page-editor-form.tsx (CONTINUED) ====

            <FormField
              control={form.control}
              name="showInNav"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show in Navigation</FormLabel>
                    <FormDescription>
                      Include this page in the site navigation
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

            {form.watch('showInNav') && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="navLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Navigation Label</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder="About"
                        />
                      </FormControl>
                      <FormDescription>
                        Short label for navigation (defaults to title)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="navOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Navigation Order</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Lower numbers appear first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
            <CardDescription>
              Search engine optimization settings
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
                      placeholder="Custom page title for search engines"
                      maxLength={60}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value?.length ?? 0)}/60 characters
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
                      placeholder="Brief description for search results"
                      rows={3}
                      maxLength={160}
                    />
                  </FormControl>
                  <FormDescription>
                    {(field.value?.length ?? 0)}/160 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Page'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function PageEditorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-96 animate-pulse rounded-lg bg-muted" />
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}