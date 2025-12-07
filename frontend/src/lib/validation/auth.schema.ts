// ==== FILE: src/lib/validation/auth.schema.ts ====
/**
 * Authentication Validation Schemas
 */

import { z } from 'zod';
import { REGEX } from '@/lib/constants/config';

// ─────────────────────────────────────────────────────────────────────────────
// Base Fields
// ─────────────────────────────────────────────────────────────────────────────

const email = z.string().min(1, 'Email is required').email('Invalid email');

const username = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(REGEX.username, 'Only letters, numbers, and underscores');

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .refine((p) => /[A-Z]/.test(p), 'Must contain uppercase letter')
  .refine((p) => /[a-z]/.test(p), 'Must contain lowercase letter')
  .refine((p) => /[0-9]/.test(p), 'Must contain number');

const confirmPassword = z.string().min(1, 'Please confirm password');

// ─────────────────────────────────────────────────────────────────────────────
// Auth Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, 'Email or username is required')
    .refine((v) => REGEX.email.test(v) || REGEX.username.test(v), 'Invalid email or username'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z
  .object({
    email,
    username,
    displayName: z.string().min(1, 'Display name is required').max(100, 'Display name is too long'),
    password,
    confirmPassword,
    acceptTerms: z.boolean().refine((v) => v, 'You must accept the terms'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─────────────────────────────────────────────────────────────────────────────
// Password Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({ newPassword: password, confirmPassword })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: password,
    confirmPassword,
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((d) => d.currentPassword !== d.newPassword, {
    message: 'New password must be different',
    path: ['newPassword'],
  });

// ─────────────────────────────────────────────────────────────────────────────
// MFA Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const mfaCodeSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits').regex(REGEX.mfaCode, 'Numbers only'),
});

export const mfaBackupCodeSchema = z.object({
  code: z.string().regex(REGEX.backupCode, 'Invalid backup code format'),
});

export const mfaDisableSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  code: z.string().optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Email Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const emailChangeSchema = z.object({ newEmail: email });

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type MfaCodeFormData = z.infer<typeof mfaCodeSchema>;
export type MfaBackupCodeFormData = z.infer<typeof mfaBackupCodeSchema>;
export type MfaDisableFormData = z.infer<typeof mfaDisableSchema>;
export type EmailChangeFormData = z.infer<typeof emailChangeSchema>;