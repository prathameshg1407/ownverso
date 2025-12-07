// ==== FILE: src/app/(reader-dashboard)/settings/_components/content-preferences-form.tsx ====
/**
 * Content Preferences Form
 */

'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Languages, Shield, Hash, Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useUserPreferences } from '@/hooks';
import {
  contentPreferencesSchema,
  type ContentPreferencesFormData,
} from '@/lib/validation/user.schema';
import type { ContentRating } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ko', label: 'Korean' },
  { value: 'hi', label: 'Hindi' },
  { value: 'id', label: 'Indonesian' },
  { value: 'th', label: 'Thai' },
  { value: 'vi', label: 'Vietnamese' },
] as const;

const CONTENT_RATINGS: { value: ContentRating; label: string; description: string }[] = [
  { value: 'EVERYONE', label: 'Everyone', description: 'Suitable for all ages' },
  { value: 'TEEN', label: 'Teen', description: 'May contain mild themes' },
  { value: 'MATURE', label: 'Mature', description: 'Contains mature themes' },
  { value: 'ADULT_ONLY', label: 'Adult Only', description: '18+ content only' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface ContentPreferencesFormProps {
  initialData: ContentPreferencesFormData;
}

export function ContentPreferencesForm({ initialData }: ContentPreferencesFormProps) {
  const { updatePreferences, isUpdating } = useUserPreferences();

  const form = useForm<ContentPreferencesFormData>({
    resolver: zodResolver(contentPreferencesSchema),
    defaultValues: initialData,
  });

  const onSubmit = useCallback(
    (data: ContentPreferencesFormData) => {
      updatePreferences(data);
    },
    [updatePreferences]
  );

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Content Languages */}
        <FormField
          control={form.control}
          name="contentLanguages"
          render={() => (
            <FormItem>
              <div className="mb-4 flex items-center gap-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <div>
                  <FormLabel className="text-base">Content Languages</FormLabel>
                  <FormDescription>
                    Select the languages you want to see content in
                  </FormDescription>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {LANGUAGES.map((language) => (
                  <FormField
                    key={language.value}
                    control={form.control}
                    name="contentLanguages"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(language.value)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              field.onChange(
                                checked
                                  ? [...current, language.value]
                                  : current.filter((v) => v !== language.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {language.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Ratings */}
        <FormField
          control={form.control}
          name="contentRatings"
          render={() => (
            <FormItem>
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <FormLabel className="text-base">Content Ratings</FormLabel>
                  <FormDescription>Select the content ratings you want to see</FormDescription>
                </div>
              </div>
              <div className="space-y-3">
                {CONTENT_RATINGS.map((rating) => (
                  <FormField
                    key={rating.value}
                    control={form.control}
                    name="contentRatings"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-lg border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(rating.value)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              field.onChange(
                                checked
                                  ? [...current, rating.value]
                                  : current.filter((v) => v !== rating.value)
                              );
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer font-medium">
                            {rating.label}
                          </FormLabel>
                          <FormDescription>{rating.description}</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hidden Genres */}
        <FormField
          control={form.control}
          name="hiddenGenres"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2 flex items-center gap-2">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <FormLabel className="text-base">Hidden Genres</FormLabel>
                  <FormDescription>
                    Genres you don&apos;t want to see in recommendations
                  </FormDescription>
                </div>
              </div>
              <div className="flex min-h-[40px] flex-wrap gap-2 rounded-lg border bg-muted/30 p-3">
                {field.value && field.value.length > 0 ? (
                  field.value.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => field.onChange(field.value?.filter((g) => g !== genre))}
                    >
                      {genre} ×
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No hidden genres</span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hidden Tags */}
        <FormField
          control={form.control}
          name="hiddenTags"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2 flex items-center gap-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <FormLabel className="text-base">Hidden Tags</FormLabel>
                  <FormDescription>
                    Tags you don&apos;t want to see in recommendations
                  </FormDescription>
                </div>
              </div>
              <div className="flex min-h-[40px] flex-wrap gap-2 rounded-lg border bg-muted/30 p-3">
                {field.value && field.value.length > 0 ? (
                  field.value.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => field.onChange(field.value?.filter((t) => t !== tag))}
                    >
                      {tag} ×
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No hidden tags</span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isUpdating || !isDirty}>
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Preferences
          </Button>
        </div>
      </form>
    </Form>
  );
}