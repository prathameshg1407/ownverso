// ==== FILE: src/app/(reader-dashboard)/settings/_components/social-links-form.tsx ====
/**
 * Social Links Form Component
 */

'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Globe, Twitter, Instagram, Music2, MessageCircle } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useUserProfile } from '@/hooks';

// ─────────────────────────────────────────────────────────────────────────────
// Schema & Config
// ─────────────────────────────────────────────────────────────────────────────

const socialLinksSchema = z.object({
  websiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  twitterHandle: z.string().max(15, 'Twitter handle must be less than 15 characters').optional().or(z.literal('')),
  instagramHandle: z.string().max(30, 'Instagram handle must be less than 30 characters').optional().or(z.literal('')),
  tiktokHandle: z.string().max(24, 'TikTok handle must be less than 24 characters').optional().or(z.literal('')),
  discordHandle: z.string().max(50, 'Discord handle is too long').optional().or(z.literal('')),
});

type SocialLinksFormData = z.infer<typeof socialLinksSchema>;

const SOCIAL_FIELDS = [
  { name: 'websiteUrl' as const, label: 'Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
  { name: 'twitterHandle' as const, label: 'Twitter / X', icon: Twitter, placeholder: 'username' },
  { name: 'instagramHandle' as const, label: 'Instagram', icon: Instagram, placeholder: 'username' },
  { name: 'tiktokHandle' as const, label: 'TikTok', icon: Music2, placeholder: 'username' },
  { name: 'discordHandle' as const, label: 'Discord', icon: MessageCircle, placeholder: 'username#0000' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface SocialLinksFormProps {
  initialData: SocialLinksFormData;
}

export function SocialLinksForm({ initialData }: SocialLinksFormProps) {
  const { updateProfile, isUpdatingProfile } = useUserProfile();

  const form = useForm<SocialLinksFormData>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: initialData,
  });

  const onSubmit = useCallback(
    (data: SocialLinksFormData) => {
      updateProfile({
        websiteUrl: data.websiteUrl || null,
        twitterHandle: data.twitterHandle || null,
        instagramHandle: data.instagramHandle || null,
        tiktokHandle: data.tiktokHandle || null,
        discordHandle: data.discordHandle || null,
      });
    },
    [updateProfile]
  );

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Website (Full Width) */}
        {SOCIAL_FIELDS.slice(0, 1).map((field) => {
          const Icon = field.icon;
          return (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input {...formField} placeholder={field.placeholder} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {/* Social Handles (Grid) */}
        <div className="grid gap-4 md:grid-cols-2">
          {SOCIAL_FIELDS.slice(1).map((field) => {
            const Icon = field.icon;
            return (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input {...formField} placeholder={field.placeholder} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isUpdatingProfile || !isDirty}>
            {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Links
          </Button>
        </div>
      </form>
    </Form>
  );
}