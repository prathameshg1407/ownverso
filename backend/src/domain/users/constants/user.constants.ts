/**
 * User Domain Constants
 */

export const RESERVED_USERNAMES = [
  'admin',
  'administrator',
  'root',
  'system',
  'support',
  'help',
  'info',
  'contact',
  'about',
  'settings',
  'profile',
  'api',
  'auth',
  'login',
  'logout',
  'register',
  'signup',
  'ownverso',
  'official',
  'moderator',
  'mod',
  'staff',
  'security',
  'legal',
  'privacy',
  'terms',
  'copyright',
  'null',
  'undefined',
  'anonymous',
  'guest',
  'user',
] as const;

export const VALID_LOCALES = [
  'en',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'ru',
  'zh',
  'ja',
  'ko',
  'hi',
  'ar',
  'bn',
  'id',
  'ms',
  'th',
  'vi',
  'tr',
  'pl',
  'nl',
] as const;

export const USER_DEFAULTS = {
  LOCALE: 'en',
  TIMEZONE: 'UTC',
  DATA_REGION: 'NORTH_AMERICA',
  EMAIL_DIGEST_FREQUENCY: 'WEEKLY',
  CONTENT_RATINGS: ['EVERYONE', 'TEEN'],
} as const;

export const USER_LIMITS = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  DISPLAY_NAME_MAX_LENGTH: 100,
  BIO_MAX_LENGTH: 2000,
  URL_MAX_LENGTH: 2048,
  SOCIAL_HANDLE_MAX_LENGTH: 50,
  STATUS_HISTORY_MAX_ENTRIES: 20,
  MAX_ACTIVE_SESSIONS: 10,
} as const;

export type ReservedUsername = (typeof RESERVED_USERNAMES)[number];
export type ValidLocale = (typeof VALID_LOCALES)[number];