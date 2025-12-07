// ==== FILE: src/app/(reader-dashboard)/settings/_components/danger-zone.tsx ====
/**
 * Danger Zone Component
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useUser } from '@/hooks';
import { useAuthStore } from '@/lib/stores/auth.store';
import { AUTH_ROUTES } from '@/lib/constants/routes';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface DeleteAccountFormData {
  confirmation: string;
  password: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function DangerZone() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { deleteAccount, isDeleting } = useUser();
  const { logout } = useAuthStore();

  const form = useForm<DeleteAccountFormData>({
    defaultValues: {
      confirmation: '',
      password: '',
    },
  });

  const confirmation = form.watch('confirmation');
  const password = form.watch('password');
  const isValid = confirmation === 'DELETE' && password.length > 0;

  const onSubmit = useCallback(
    async (data: DeleteAccountFormData) => {
      if (data.confirmation !== 'DELETE') {
        form.setError('confirmation', { message: 'Type DELETE to confirm' });
        return;
      }

      if (!data.password) {
        form.setError('password', { message: 'Password is required' });
        return;
      }

      try {
        await deleteAccount();
        setIsOpen(false);
        logout();
        router.push(AUTH_ROUTES.login);
      } catch {
        // Error handled by mutation
      }
    },
    [deleteAccount, logout, router, form]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        form.reset();
      }
    },
    [form]
  );

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
          </div>

          <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and
                  remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Type <span className="font-mono font-bold">DELETE</span> to confirm
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="DELETE" autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your password to confirm this action.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <AlertDialogFooter>
                    <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                    <Button type="submit" variant="destructive" disabled={isDeleting || !isValid}>
                      {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Delete My Account
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}