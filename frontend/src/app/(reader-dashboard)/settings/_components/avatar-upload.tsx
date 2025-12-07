// ==== FILE: src/app/(reader-dashboard)/settings/_components/avatar-upload.tsx ====
/**
 * Avatar Upload Component
 */

'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, Trash2, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

import { useUserProfile } from '@/hooks';
import { FILE_LIMITS } from '@/lib/constants/config';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function isValidImageType(type: string): boolean {
  return FILE_LIMITS.allowedImageTypes.includes(type as typeof FILE_LIMITS.allowedImageTypes[number]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface AvatarUploadProps {
  currentAvatarUrl: string | null | undefined;
  displayName: string;
}

export function AvatarUpload({ currentAvatarUrl, displayName }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { uploadAvatar, isUploadingAvatar, deleteAvatar, isDeletingAvatar } = useUserProfile();

  const maxMB = FILE_LIMITS.maxAvatarSize / (1024 * 1024);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!isValidImageType(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a JPEG, PNG, GIF, or WebP image.',
        });
        return;
      }

      if (file.size > FILE_LIMITS.maxAvatarSize) {
        toast.error('File too large', {
          description: `Avatar must be less than ${maxMB}MB.`,
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);

      try {
        await uploadAvatar(file);
        setPreviewUrl(null);
      } catch {
        setPreviewUrl(null);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [uploadAvatar, maxMB]
  );

  const handleDeleteAvatar = useCallback(async () => {
    await deleteAvatar();
    setPreviewUrl(null);
  }, [deleteAvatar]);

  const displayAvatarUrl = previewUrl || currentAvatarUrl;

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={displayAvatarUrl ?? undefined} alt={displayName} />
        <AvatarFallback className="text-2xl">
          {displayName ? getInitials(displayName) : <User className="h-12 w-12" />}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingAvatar}
          >
            {isUploadingAvatar ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload
          </Button>

          {currentAvatarUrl && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  disabled={isDeletingAvatar}
                >
                  {isDeletingAvatar ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Avatar</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove your profile picture? This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAvatar}>Remove</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <p className="text-sm text-muted-foreground">JPG, PNG, GIF or WebP. Max {maxMB}MB.</p>

        <input
          ref={fileInputRef}
          type="file"
          accept={FILE_LIMITS.allowedImageTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload avatar"
        />
      </div>
    </div>
  );
}