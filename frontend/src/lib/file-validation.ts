// ==== FILE: lib/utils/file-validation.ts (ensure export exists) ====
/**
 * File Validation Utilities
 */

import { FILE_LIMITS } from '@/lib/constants/config';

type AllowedImageType = (typeof FILE_LIMITS.allowedImageTypes)[number];

export function isValidImageType(mimeType: string): mimeType is AllowedImageType {
  return (FILE_LIMITS.allowedImageTypes as readonly string[]).includes(mimeType);
}

export function isValidFileSize(size: number, maxSize = FILE_LIMITS.maxAvatarSize): boolean {
  return size > 0 && size <= maxSize;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File): FileValidationResult {
  if (!isValidImageType(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${FILE_LIMITS.allowedImageTypes.join(', ')}`,
    };
  }

  if (!isValidFileSize(file.size)) {
    const maxMB = FILE_LIMITS.maxAvatarSize / (1024 * 1024);
    return { valid: false, error: `File too large. Maximum size: ${maxMB}MB` };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}