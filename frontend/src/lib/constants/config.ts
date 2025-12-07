/**
 * Application Configuration
 */

const API_BASE_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001';

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: `${API_BASE_URL}/api/v1`,
  timeout: 30_000,
} as const;

export const AUTH_CONFIG = {
  storageKey: 'auth-storage',
  tokenRefreshThresholdMs: 5 * 60 * 1000,
} as const;

export const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  username: /^[a-zA-Z0-9_]{3,30}$/,
  password: /^.{8,128}$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  cuid: /^c[a-z0-9]{24}$/,
  mfaCode: /^\d{6}$/,
  backupCode: /^[A-Z0-9]{4}-[A-Z0-9]{4}$/,
  socialHandle: /^[a-zA-Z0-9_]+$/,
} as const;

export const FILE_LIMITS = {
  maxAvatarSize: 5 * 1024 * 1024,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;

export const CACHE_TIMES = {
  user: 5 * 60 * 1000,
  sessions: 5 * 60 * 1000,
  security: 5 * 60 * 1000,
  preferences: 5 * 60 * 1000,
  loginHistory: 2 * 60 * 1000,
  publicUser: 10 * 60 * 1000,
  adminUsers: 60 * 1000,
  mfaStatus: 5 * 60 * 1000,
  oauthProviders: 30 * 60 * 1000,
  linkedAccounts: 5 * 60 * 1000,
} as const;

export const APP_CONFIG = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;