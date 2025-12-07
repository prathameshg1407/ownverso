// ==== FILE: src/domain/auth/services/password.service.ts ====
/**
 * Password Domain Service
 * Password reset and change operations
 */

import { logger } from '@/core/logger';
import { passwordService as corePasswordService, tokenService } from '@/core/security';
import { emailService } from '@/core/email';
import { BadRequestError, UnauthorizedError, NotFoundError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { userRepository } from '@/domain/users/repositories/user.repository';
import { userSecurityRepository } from '@/domain/users/repositories/user-security.repository';
import { sessionRepository } from '../repositories/session.repository';

export const passwordDomainService = {
  /**
   * Request password reset (sends email)
   */
  async requestReset(email: string, requestedIp?: string): Promise<void> {
    const user = await userRepository.findByEmail(email);

    if (!user || !user.passwordHash) {
      logger.debug({ email }, 'Password reset requested for non-existent/OAuth email');
      return;
    }

    const resetToken = await tokenService.createToken({
      userId: user.id,
      type: 'PASSWORD_RESET',
      requestedIp,
    });

    const resetUrl = tokenService.getTokenUrl('PASSWORD_RESET', resetToken);
    await emailService.sendPasswordResetEmail(user.email, resetUrl);

    logger.info({ userId: user.publicId }, 'Password reset email sent');
  },

  /**
   * Reset password using token
   */
  async resetPassword(token: string, newPassword: string, usedIp?: string): Promise<void> {
    const validation = corePasswordService.validate(newPassword);
    if (!validation.isValid) {
      throw new BadRequestError(
        validation.errors[0] ?? 'Invalid password',
        ERROR_CODES.USER_PASSWORD_TOO_WEAK
      );
    }

    const tokenResult = await tokenService.verifyAndConsumeToken(token, 'PASSWORD_RESET', usedIp);

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

    if (user.passwordHash) {
      const isSame = await corePasswordService.verify(user.passwordHash, newPassword);
      if (isSame) {
        throw new BadRequestError('New password must be different', ERROR_CODES.USER_SAME_PASSWORD);
      }
    }

    const passwordHash = await corePasswordService.hash(newPassword);
    await userRepository.update(user.id, { passwordHash });
    await userSecurityRepository.setPasswordChanged(user.id);

    await sessionRepository.revokeAllForUser(user.id, 'Password reset');
    await tokenService.invalidateUserTokens(user.id, 'PASSWORD_RESET');

    await emailService.sendPasswordChangedEmail(user.email);

    logger.info({ userId: user.publicId }, 'Password reset completed');
  },

  /**
   * Change password (authenticated user)
   */
  async changePassword(
    userId: bigint,
    currentPassword: string,
    newPassword: string,
    currentSessionId?: bigint
  ): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (!user.passwordHash) {
      throw new BadRequestError(
        'Cannot change password for OAuth account',
        ERROR_CODES.USER_INVALID_PASSWORD
      );
    }

    const isValid = await corePasswordService.verify(user.passwordHash, currentPassword);
    if (!isValid) {
      throw new UnauthorizedError('Current password is incorrect', ERROR_CODES.USER_INVALID_PASSWORD);
    }

    const validation = corePasswordService.validate(newPassword);
    if (!validation.isValid) {
      throw new BadRequestError(
        validation.errors[0] ?? 'Invalid password',
        ERROR_CODES.USER_PASSWORD_TOO_WEAK
      );
    }

    const isSame = await corePasswordService.verify(user.passwordHash, newPassword);
    if (isSame) {
      throw new BadRequestError('New password must be different', ERROR_CODES.USER_SAME_PASSWORD);
    }

    const passwordHash = await corePasswordService.hash(newPassword);
    await userRepository.update(userId, { passwordHash });
    await userSecurityRepository.setPasswordChanged(userId);

    if (currentSessionId) {
      await sessionRepository.revokeAllExcept(userId, currentSessionId, 'Password changed');
    }

    await emailService.sendPasswordChangedEmail(user.email);

    logger.info({ userId: user.publicId }, 'Password changed');
  },

  /**
   * Check password strength
   */
  checkStrength(password: string) {
    return corePasswordService.checkStrength(password);
  },
} as const;

export type PasswordDomainService = typeof passwordDomainService;