// ==== FILE: src/app/(author)/sites/[siteId]/settings/danger/_components/danger-zone-form.tsx ====
/**
 * Danger Zone Form
 */

'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSiteDetail } from '@/hooks';

interface DangerZoneFormProps {
  siteId: string;
}

export function DangerZoneForm({ siteId }: DangerZoneFormProps) {
  const { site, deleteSite, isDeleting } = useSiteDetail(siteId);
  const [confirmText, setConfirmText] = useState('');

  const siteName = site?.name ?? '';
  const canDelete = confirmText === siteName;

  return (
    <div className="space-y-6">
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Delete Site */}
          <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
            <div>
              <h4 className="font-medium text-destructive">Delete this site</h4>
              <p className="text-sm text-muted-foreground">
                Once deleted, all content will be permanently removed.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Site
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-4">
                    <p>
                      This action cannot be undone. This will permanently delete the
                      site <strong>{siteName}</strong> and remove all associated data
                      including:
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>All series and chapters</li>
                      <li>All pages</li>
                      <li>Subscriber data</li>
                      <li>Analytics history</li>
                      <li>Custom domain configuration</li>
                    </ul>
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="confirm-delete">
                        Type <strong>{siteName}</strong> to confirm:
                      </Label>
                      <Input
                        id="confirm-delete"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder={siteName}
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setConfirmText('')}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteSite()}
                    disabled={!canDelete || isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Delete Site
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}