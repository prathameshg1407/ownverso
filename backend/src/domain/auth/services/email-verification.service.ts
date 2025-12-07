// ==== FILE: src/domain/auth/services/email-verification.service.ts ====
/**
 * Email Verification Service
 * Handles email verification and email change flows
 */

import { logger } from '@/core/logger';
import { tokenService } from '@/core/security';
import { emailService } from '@/core/email';
import { BadRequestError, NotFoundError, ConflictError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { userRepository } from '@/domain/users/repositories/user.repository';
import { userSecurityRepository } from '@/domain/users/repositories/user-security.repository';

export const emailVerificationService = {
  /**
   * Verify email with token
   */
  async verifyEmail(token: string, usedIp?: string): Promise<void> {
    const tokenResult = await tokenService.verifyAndConsumeToken(token, 'EMAIL_VERIFICATION', usedIp);

    if (!tokenResult.valid || !tokenResult.token) {
      throw new BadRequestError(
        tokenResult.error ?? 'Invalid or expired token',
        ERROR_CODES.VERIFICATION_TOKEN_INVALID
      );
    }

    const user = await userRepository.findById(tokenResult.token.userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (user.emailVerified) {
      logger.debug({ userId: user.publicId }, 'Email already verified');
      return;
    }

    await userSecurityRepository.setEmailVerified(tokenResult.token.userId);
    await tokenService.invalidateUserTokens(tokenResult.token.userId, 'EMAIL_VERIFICATION');

    logger.info({ userId: user.publicId }, 'Email verified');
  },

  /**
   * Resend verification email
   */
  async resendVerification(userId: bigint, requestedIp?: string): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (user.emailVerified) {
      throw new BadRequestError('Email already verified', ERROR_CODES.BAD_REQUEST);
    }

    const verificationToken = await tokenService.createToken({
      userId: user.id,
      type: 'EMAIL_VERIFICATION',
      requestedIp,
    });

    const verificationUrl = tokenService.getTokenUrl('EMAIL_VERIFICATION', verificationToken);
    await emailService.sendVerificationEmail(user.email, verificationUrl);

    logger.info({ userId: user.publicId }, 'Verification email resent');
  },

  /**
   * Request email change
   */
  async requestEmailChange(userId: bigint, newEmail: string, requestedIp?: string): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    const normalizedEmail = newEmail.toLowerCase().trim();

    if (normalizedEmail === user.email) {
      throw new BadRequestError('New email is same as current', ERROR_CODES.BAD_REQUEST);
    }

    if (await userRepository.emailExists(normalizedEmail, userId)) {
      throw new ConflictError('Email already in use', ERROR_CODES.USER_EMAIL_TAKEN);
    }

    const changeToken = await tokenService.createToken({
      userId: user.id,
      type: 'EMAIL_CHANGE',
      newEmail: normalizedEmail,
      requestedIp,
    });

    const confirmationUrl = tokenService.getTokenUrl('EMAIL_CHANGE', changeToken);
    await emailService.sendEmailChangeRequestEmail(normalizedEmail, normalizedEmail, confirmationUrl);

    logger.info({ userId: user.publicId, newEmail: normalizedEmail }, 'Email change requested');
  },

  /**
   * Confirm email change with token
   */
  async confirmEmailChange(token: string, usedIp?: string): Promise<{ oldEmail: string; newEmail: string }> {
    const tokenResult = await tokenService.verifyAndConsumeToken(token, 'EMAIL_CHANGE', usedIp);

    if (!tokenResult.valid || !tokenResult.token?.newEmail) {
      throw new BadRequestError(
        tokenResult.error ?? 'Invalid or expired token',
        ERROR_CODES.VERIFICATION_TOKEN_INVALID
      );
    }

    const { userId, newEmail } = tokenResult.token;
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    const oldEmail = user.email;

    if (await userRepository.emailExists(newEmail, userId)) {
      throw new ConflictError('Email no longer available', ERROR_CODES.USER_EMAIL_TAKEN);
    }

    await userRepository.update(userId, { email: newEmail });
    await tokenService.invalidateUserTokens(userId, 'EMAIL_CHANGE');

    await emailService.send({
      to: oldEmail,
      subject: 'Your email address has been changed',
      template: 'email-change-confirmation',
      data: { oldEmail, newEmail },
    });

    logger.info({ userId: user.publicId, oldEmail, newEmail }, 'Email changed');

    return { oldEmail, newEmail };
  },
} as const;

export type EmailVerificationService = typeof emailVerificationService;