// ==== FILE: src/app/(author)/sites/create/_components/create-site-form.tsx ====
/**
 * Create Site Form Component
 */

'use client';

import { useState } from 'react';
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
import { useSites } from '@/hooks';
import { createSiteSchema, type CreateSiteFormData } from '@/lib/validation/site.schema';
import { slugify } from '@/lib/utils/string';

export function CreateSiteForm() {
  const { createSite, isCreating } = useSites();
  const [autoSlug, setAutoSlug] = useState(true);

  const form = useForm<CreateSiteFormData>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      name: '',
      slug: '',
      tagline: '',
      description: '',
    },
  });

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    form.setValue('name', name);
    if (autoSlug) {
      form.setValue('slug', slugify(name));
    }
  };

  const onSubmit = (data: CreateSiteFormData) => {
    createSite(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Site Details</CardTitle>
            <CardDescription>
              Basic information about your new site
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="My Awesome Stories"
                    />
                  </FormControl>
                  <FormDescription>
                    The public name of your site
                  </FormDescription>
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
                      <Input
                        {...field}
                        onChange={(e) => {
                          setAutoSlug(false);
                          field.onChange(e.target.value.toLowerCase());
                        }}
                        className="rounded-l-none"
                        placeholder="my-awesome-stories"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    The URL path for your site (lowercase, no spaces)
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
                  <FormLabel>Tagline (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Where imagination meets adventure"
                    />
                  </FormControl>
                  <FormDescription>
                    A short catchy phrase for your site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Tell visitors what your site is about..."
                    />
                  </FormControl>
                  <FormDescription>
                    A longer description for your site's about section
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-end gap-3 border-t pt-6">
            <Button type="submit" disabled={isCreating}>
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Site
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}