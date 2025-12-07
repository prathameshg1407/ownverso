// ==== FILE: src/api/v1/auth/guards/email-verified.guard.ts ====
/**
 * Email Verification Guard
 */

import type { preHandlerHookHandler } from 'fastify';
import { ForbiddenError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';

export const requireEmailVerified: preHandlerHookHandler = async (request) => {
  if (!request.user) {
    throw new ForbiddenError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }

  if (!request.user.emailVerified) {
    throw new ForbiddenError(
      'Email verification required',
      ERROR_CODES.AUTH_EMAIL_NOT_VERIFIED,
      { email: request.user.email }
    );
  }
};