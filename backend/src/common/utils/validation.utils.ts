/**
 * Validation Utilities
 */

import { REGEX, PAGINATION } from '@/common/constants/app.constants';

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  return REGEX.EMAIL.test(email);
}

/**
 * Check if a string is a valid username
 */
export function isValidUsername(username: string): boolean {
  return REGEX.USERNAME.test(username);
}

/**
 * Check if a string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  return REGEX.SLUG.test(slug);
}

/**
 * Check if a string is a valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  return REGEX.UUID.test(uuid);
}

/**
 * Check if a string is a valid CUID
 */
export function isValidCUID(cuid: string): boolean {
  return REGEX.CUID.test(cuid);
}

/**
 * Check if a string is a valid URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return REGEX.HEX_COLOR.test(color);
}

/**
 * Password strength levels
 */
export type PasswordStrengthLevel = 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';

/**
 * Password strength result
 */
export interface PasswordStrength {
  score: number; // 0-4
  level: PasswordStrengthLevel;
  feedback: string[];
}

/**
 * Password strength score thresholds
 */
const STRENGTH_LEVELS: PasswordStrengthLevel[] = [
  'very_weak',
  'weak',
  'fair',
  'strong',
  'very_strong',
];

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length checks
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length < 8) feedback.push('Use at least 8 characters');

  // Character variety checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (hasLowercase) score += 0.5;
  else feedback.push('Add lowercase letters');

  if (hasUppercase) score += 0.5;
  else feedback.push('Add uppercase letters');

  if (hasNumbers) score += 0.5;
  else feedback.push('Add numbers');

  if (hasSpecial) score += 0.5;
  else feedback.push('Add special characters');

  // Common patterns (reduce score)
  if (/^[a-zA-Z]+$/.test(password)) score -= 0.5;
  if (/^[0-9]+$/.test(password)) score -= 0.5;
  if (/(.)\1{2,}/.test(password)) {
    score -= 0.5;
    feedback.push('Avoid repeated characters');
  }

  // Normalize score to 0-4
  const normalizedScore = Math.max(0, Math.min(4, Math.floor(score)));

  return {
    score: normalizedScore,
    level: STRENGTH_LEVELS[normalizedScore]!,
    feedback,
  };
}

/**
 * Sanitize a string for safe output
 */
export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

/**
 * Normalize email address
 */
export function normalizeEmail(email: string): string {
  const trimmedEmail = email.toLowerCase().trim();
  const [local, domain] = trimmedEmail.split('@');
  
  if (!local || !domain) return trimmedEmail;

  // Remove dots and everything after + in Gmail addresses
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const normalizedLocal = local.replace(/\./g, '').split('+')[0];
    return `${normalizedLocal}@${domain}`;
  }

  return trimmedEmail;
}

/**
 * Validated pagination result
 */
export interface ValidatedPagination {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Pagination defaults
 */
interface PaginationDefaults {
  page: number;
  limit: number;
  maxLimit: number;
}

const DEFAULT_PAGINATION: PaginationDefaults = {
  page: PAGINATION.DEFAULT_PAGE,
  limit: PAGINATION.DEFAULT_LIMIT,
  maxLimit: PAGINATION.MAX_LIMIT,
};

/**
 * Validate pagination parameters
 */
export function validatePagination(
  page?: number | string,
  limit?: number | string,
  defaults: PaginationDefaults = DEFAULT_PAGINATION
): ValidatedPagination {
  const parsedPage = typeof page === 'string' ? parseInt(page, 10) : page;
  const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;

  const validPage =
    Number.isNaN(parsedPage) || !parsedPage || parsedPage < 1
      ? defaults.page
      : parsedPage;

  const validLimit =
    Number.isNaN(parsedLimit) || !parsedLimit || parsedLimit < 1
      ? defaults.limit
      : Math.min(parsedLimit, defaults.maxLimit);

  return {
    page: validPage,
    limit: validLimit,
    skip: (validPage - 1) * validLimit,
  };
}