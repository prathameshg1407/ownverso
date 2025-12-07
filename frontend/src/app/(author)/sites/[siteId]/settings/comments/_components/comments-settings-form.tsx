// ==== FILE: src/app/(author)/sites/[siteId]/settings/comments/_components/comments-settings-form.tsx ====
/**
 * Comments Settings Form
 */

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MessageSquare, Shield, Clock, UserCheck } from 'lucide-react';

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
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSiteSettings } from '@/hooks';
import {
  updateSiteCommentsSchema,
  type UpdateSiteCommentsFormData,
} from '@/lib/validation/site.schema';
import { cn } from '@/lib/utils';

interface CommentsSettingsFormProps {
  siteId: string;
}

const moderationModes = [
  {
    value: 'NONE',
    label: 'No Moderation',
    description: 'All comments are published immediately',
    icon: MessageSquare,
  },
  {
    value: 'PRE_APPROVE',
    label: 'Pre-Approve',
    description: 'Comments require approval before being visible',
    icon: Shield,
  },
  {
    value: 'POST_APPROVE',
    label: 'Post-Approve',
    description: 'Comments are visible but can be removed later',
    icon: Clock,
  },
  {
    value: 'TRUSTED_ONLY',
    label: 'Trusted Only',
    description: 'Only verified users can comment without approval',
    icon: UserCheck,
  },
];

export function CommentsSettingsForm({ siteId }: CommentsSettingsFormProps) {
  const { settings, isLoading, updateComments, isUpdatingComments } = useSiteSettings(siteId);

  const form = useForm<UpdateSiteCommentsFormData>({
    resolver: zodResolver(updateSiteCommentsSchema),
    defaultValues: {
      commentsEnabled: true,
      commentsModerationMode: 'POST_APPROVE',
    },
  });

  useEffect(() => {
    if (settings?.comments) {
      form.reset({
        commentsEnabled: settings.comments.commentsEnabled,
        commentsModerationMode: settings.comments.commentsModerationMode,
      });
    }
  }, [settings, form]);

  const onSubmit = (data: UpdateSiteCommentsFormData) => {
    updateComments(data);
  };

  if (isLoading) {
    return <CommentsSettingsSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
            <CardDescription>
              Configure how comments work on your site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="commentsEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Comments</FormLabel>
                    <FormDescription>
                      Allow readers to leave comments on your content
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

            {form.watch('commentsEnabled') && (
              <FormField
                control={form.control}
                name="commentsModerationMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moderation Mode</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid gap-4 sm:grid-cols-2"
                      >
                        {moderationModes.map((mode) => {
                          const Icon = mode.icon;
                          const isSelected = field.value === mode.value;
                          
                          return (
                            <label
                              key={mode.value}
                              className={cn(
                                'flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors',
                                isSelected
                                  ? 'border-primary bg-primary/5'
                                  : 'hover:border-primary/50'
                              )}
                            >
                              <RadioGroupItem value={mode.value} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{mode.label}</span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {mode.description}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isUpdatingComments}>
              {isUpdatingComments && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function CommentsSettingsSkeleton() {
  return (
    <div className="h-96 animate-pulse rounded-lg bg-muted" />
  );
}