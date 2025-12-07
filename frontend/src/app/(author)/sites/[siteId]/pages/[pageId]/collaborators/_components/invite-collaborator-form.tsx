// ==== FILE: src/app/(author)/sites/[siteId]/collaborators/_components/invite-collaborator-form.tsx ====
/**
 * Invite Collaborator Form
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSiteCollaborators } from '@/hooks';
import {
  inviteCollaboratorSchema,
  type InviteCollaboratorFormData,
} from '@/lib/validation/site.schema';

interface InviteCollaboratorFormProps {
  siteId: string;
  onSuccess?: () => void;
}

const roles = [
  { value: 'VIEWER', label: 'Viewer', description: 'Can view content' },
  { value: 'EDITOR', label: 'Editor', description: 'Can edit content' },
  { value: 'TRANSLATOR', label: 'Translator', description: 'Can translate content' },
  { value: 'ANALYST', label: 'Analyst', description: 'Can view analytics' },
  { value: 'MANAGER', label: 'Manager', description: 'Full management access' },
];

export function InviteCollaboratorForm({ siteId, onSuccess }: InviteCollaboratorFormProps) {
  const { inviteCollaborator, isInviting } = useSiteCollaborators(siteId);

  const form = useForm<InviteCollaboratorFormData>({
    resolver: zodResolver(inviteCollaboratorSchema),
    defaultValues: {
      email: '',
      role: 'EDITOR',
    },
  });

  const onSubmit = (data: InviteCollaboratorFormData) => {
    inviteCollaborator(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="collaborator@example.com"
                />
              </FormControl>
              <FormDescription>
                They will receive an invitation email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div>
                        <span className="font-medium">{role.label}</span>
                        <span className="ml-2 text-muted-foreground">
                          — {role.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isInviting}>
            {isInviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Invitation
          </Button>
        </div>
      </form>
    </Form>
  );
}