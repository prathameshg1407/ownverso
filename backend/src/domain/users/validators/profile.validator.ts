/**
 * Profile Validators
 */

import { BadRequestError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { VALID_LOCALES, USER_LIMITS } from '../constants';

const VALID_LOCALES_SET = new Set(VALID_LOCALES);
const SOCIAL_HANDLE_REGEX = /^[a-zA-Z0-9_]+$/;

const SOCIAL_PLATFORM_LIMITS: Record<string, number> = {
  twitter: 15,
  instagram: 30,
  tiktok: 24,
  discord: 50,
};

export const profileValidator = {
  validateBio(bio: string | null | undefined): void {
    if (bio && bio.length > USER_LIMITS.BIO_MAX_LENGTH) {
      throw new BadRequestError(
        `Bio must be at most ${USER_LIMITS.BIO_MAX_LENGTH} characters`,
        ERROR_CODES.VALIDATION_ERROR,
      );
    }
  },

  validateLocale(locale: string): void {
    if (!locale || locale.length !== 2 || !VALID_LOCALES_SET.has(locale.toLowerCase() as (typeof VALID_LOCALES)[number])) {
      throw new BadRequestError('Invalid locale code', ERROR_CODES.VALIDATION_ERROR);
    }
  },

  validateTimezone(timezone: string): void {
    if (!timezone || timezone.length > 50) {
      throw new BadRequestError('Invalid timezone', ERROR_CODES.VALIDATION_ERROR);
    }
  },

  validateUrl(url: string | null | undefined, fieldName: string): void {
    if (!url) return;

    if (url.length > USER_LIMITS.URL_MAX_LENGTH) {
      throw new BadRequestError(`${fieldName} URL is too long`, ERROR_CODES.VALIDATION_ERROR);
    }

    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      throw new BadRequestError(`${fieldName} must be a valid URL`, ERROR_CODES.VALIDATION_ERROR);
    }
  },

  validateSocialHandle(
    handle: string | null | undefined,
    platform: string,
    maxLength?: number,
  ): void {
    if (!handle) return;

    const limit = maxLength ?? SOCIAL_PLATFORM_LIMITS[platform.toLowerCase()] ?? USER_LIMITS.SOCIAL_HANDLE_MAX_LENGTH;

    if (handle.length > limit) {
      throw new BadRequestError(
        `${platform} handle must be at most ${limit} characters`,
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    const cleanHandle = handle.startsWith('@') ?handle.slice(1) : handle;

    if (!SOCIAL_HANDLE_REGEX.test(cleanHandle)) {
      throw new BadRequestError(`Invalid ${platform} handle`, ERROR_CODES.VALIDATION_ERROR);
    }
  },

  validateProfileUpdate(data: {
    bio?: string | null;
    locale?: string;
    timezone?: string;
    websiteUrl?: string | null;
    twitterHandle?: string | null;
    instagramHandle?: string | null;
    tiktokHandle?: string | null;
    discordHandle?: string | null;
  }): void {
    if (data.bio !== undefined) this.validateBio(data.bio);
    if (data.locale) this.validateLocale(data.locale);
    if (data.timezone) this.validateTimezone(data.timezone);
    if (data.websiteUrl !== undefined) this.validateUrl(data.websiteUrl, 'Website');
    if (data.twitterHandle !== undefined) this.validateSocialHandle(data.twitterHandle, 'Twitter');
    if (data.instagramHandle !== undefined) this.validateSocialHandle(data.instagramHandle, 'Instagram');
    if (data.tiktokHandle !== undefined) this.validateSocialHandle(data.tiktokHandle, 'TikTok');
    if (data.discordHandle !== undefined) this.validateSocialHandle(data.discordHandle, 'Discord');
  },
};

export type ProfileValidator = typeof profileValidator;