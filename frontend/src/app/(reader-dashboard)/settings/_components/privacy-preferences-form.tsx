// ==== FILE: src/app/(reader-dashboard)/settings/_components/privacy-preferences-form.tsx ====
/**
 * Privacy Preferences Form
 */

'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, Activity, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { useUserPreferences } from '@/hooks';
import {
  privacyPreferencesSchema,
  type PrivacyPreferencesFormData,
} from '@/lib/validation/user.schema';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const PRIVACY_FIELDS = [
  {
    name: 'showOnlineStatus' as const,
    label: 'Show Online Status',
    description: "Let others see when you're online",
    icon: Eye,
  },
  {
    name: 'showReadingActivity' as const,
    label: 'Show Reading Activity',
    description: "Let others see what you're reading and your reading stats",
    icon: Activity,
  },
  {
    name: 'allowDirectMessages' as const,
    label: 'Allow Direct Messages',
    description: 'Allow other users to send you direct messages',
    icon: MessageSquare,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface PrivacyPreferencesFormProps {
  initialData: PrivacyPreferencesFormData;
}

export function PrivacyPreferencesForm({ initialData }: PrivacyPreferencesFormProps) {
  const { updatePreferences, isUpdating } = useUserPreferences();

  const form = useForm<PrivacyPreferencesFormData>({
    resolver: zodResolver(privacyPreferencesSchema),
    defaultValues: initialData,
  });

  const onSubmit = useCallback(
    (data: PrivacyPreferencesFormData) => {
      updatePreferences(data);
    },
    [updatePreferences]
  );

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {PRIVACY_FIELDS.map((field) => {
          const Icon = field.icon;
          return (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{field.label}</FormLabel>
                      <FormDescription>{field.description}</FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={formField.value} onCheckedChange={formField.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        })}

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