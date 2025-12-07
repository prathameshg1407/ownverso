/**
 * User Validators
 */

import { BadRequestError, ConflictError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { REGEX } from '@/common/constants/app.constants';
import { userRepository } from '../repositories/user.repository';
import { RESERVED_USERNAMES, USER_LIMITS } from '../constants';

const RESERVED_USERNAMES_SET = new Set(RESERVED_USERNAMES);

export const userValidator = {
  validateUsernameFormat(username: string): void {
    if (!username || username.length < USER_LIMITS.USERNAME_MIN_LENGTH) {
      throw new BadRequestError(
        `Username must be at least ${USER_LIMITS.USERNAME_MIN_LENGTH} characters`,
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    if (username.length > USER_LIMITS.USERNAME_MAX_LENGTH) {
      throw new BadRequestError(
        `Username must be at most ${USER_LIMITS.USERNAME_MAX_LENGTH} characters`,
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    if (!REGEX.USERNAME.test(username)) {
      throw new BadRequestError(
        'Username can only contain letters, numbers, and underscores',
        ERROR_CODES.VALIDATION_ERROR,
      );
    }

    if (RESERVED_USERNAMES_SET.has(username.toLowerCase() as (typeof RESERVED_USERNAMES)[number])) {
      throw new BadRequestError('This username is reserved', ERROR_CODES.USER_USERNAME_TAKEN);
    }
  },

  async checkUsernameAvailable(username: string, excludeUserId?: bigint): Promise<void> {
    this.validateUsernameFormat(username);

    const exists = await userRepository.usernameExists(username, excludeUserId);
    if (exists) {
      throw new ConflictError('This username is already taken', ERROR_CODES.USER_USERNAME_TAKEN);
    }
  },

  validateEmailFormat(email: string): void {
    if (!email || !REGEX.EMAIL.test(email)) {
      throw new BadRequestError('Invalid email address', ERROR_CODES.VALIDATION_ERROR);
    }

    if (email.length > 255) {
      throw new BadRequestError('Email address is too long', ERROR_CODES.VALIDATION_ERROR);
    }
  },

  async checkEmailAvailable(email: string, excludeUserId?: bigint): Promise<void> {
    this.validateEmailFormat(email);

    const exists = await userRepository.emailExists(email, excludeUserId);
    if (exists) {
      throw new ConflictError(
        'An account with this email already exists',
        ERROR_CODES.USER_EMAIL_TAKEN,
      );
    }
  },

  validateDisplayName(displayName: string): void {
    if (!displayName?.trim()) {
      throw new BadRequestError('Display name is required', ERROR_CODES.VALIDATION_ERROR);
    }

    if (displayName.length > USER_LIMITS.DISPLAY_NAME_MAX_LENGTH) {
      throw new BadRequestError(
        `Display name must be at most ${USER_LIMITS.DISPLAY_NAME_MAX_LENGTH} characters`,
        ERROR_CODES.VALIDATION_ERROR,
      );
    }
  },
};

export type UserValidator = typeof userValidator;