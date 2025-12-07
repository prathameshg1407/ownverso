// ==== FILE: src/domain/auth/services/mfa.service.ts ====
/**
 * MFA Domain Service
 * Multi-factor authentication operations
 */

import { logger } from '@/core/logger';
import { mfaService as coreMfaService, passwordService } from '@/core/security';
import { emailService } from '@/core/email';
import { BadRequestError, UnauthorizedError, NotFoundError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { userRepository } from '@/domain/users/repositories/user.repository';
import { userSecurityRepository } from '@/domain/users/repositories/user-security.repository';
import { sessionRepository } from '../repositories/session.repository';
import type { MfaSetupResult, MfaStatusDTO } from '../types/auth.types';

export const mfaDomainService = {
  /**
   * Initialize MFA setup
   */
  async initSetup(userId: bigint): Promise<MfaSetupResult> {
    const user = await userRepository.findWithSecurity(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (user.security?.mfaEnabled) {
      throw new BadRequestError('MFA already enabled', ERROR_CODES.BAD_REQUEST);
    }

    const setup = await coreMfaService.setupMfa(user.email);
    await userSecurityRepository.setMfaSecret(userId, setup.secret, setup.backupCodes);

    logger.info({ userId: user.publicId }, 'MFA setup initiated');

    return setup;
  },

  /**
   * Verify and complete MFA setup
   */
  async verifySetup(userId: bigint, code: string): Promise<{ backupCodes: string[] }> {
    const user = await userRepository.findWithSecurity(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (!user.security?.mfaSecret) {
      throw new BadRequestError('MFA setup not initiated', ERROR_CODES.BAD_REQUEST);
    }

    if (user.security.mfaEnabled) {
      throw new BadRequestError('MFA already enabled', ERROR_CODES.BAD_REQUEST);
    }

    const isValid = coreMfaService.verifyTotp(user.security.mfaSecret, code);
    if (!isValid) {
      throw new UnauthorizedError('Invalid code', ERROR_CODES.AUTH_MFA_INVALID);
    }

    await userSecurityRepository.enableMfa(userId);

    await emailService.send({
      to: user.email,
      subject: 'Two-factor authentication enabled',
      template: 'mfa-enabled',
      data: {},
    });

    logger.info({ userId: user.publicId }, 'MFA enabled');

    return { backupCodes: user.security.mfaBackupCodes };
  },

  /**
   * Disable MFA
   */
  async disable(userId: bigint, password: string, code?: string): Promise<void> {
    const user = await userRepository.findWithSecurity(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (!user.security?.mfaEnabled) {
      throw new BadRequestError('MFA not enabled', ERROR_CODES.BAD_REQUEST);
    }

    if (!user.passwordHash) {
      throw new BadRequestError('Cannot disable MFA for OAuth account', ERROR_CODES.BAD_REQUEST);
    }

    const isValidPassword = await passwordService.verify(user.passwordHash, password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid password', ERROR_CODES.USER_INVALID_PASSWORD);
    }

    if (code && user.security.mfaSecret) {
      const isValidCode = coreMfaService.verifyTotp(user.security.mfaSecret, code);
      if (!isValidCode) {
        throw new UnauthorizedError('Invalid code', ERROR_CODES.AUTH_MFA_INVALID);
      }
    }

    await userSecurityRepository.disableMfa(userId);

    await emailService.send({
      to: user.email,
      subject: 'Two-factor authentication disabled',
      template: 'mfa-disabled',
      data: {},
    });

    logger.info({ userId: user.publicId }, 'MFA disabled');
  },

  /**
   * Regenerate backup codes
   */
  async regenerateBackupCodes(userId: bigint, password: string): Promise<string[]> {
    const user = await userRepository.findWithSecurity(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    if (!user.security?.mfaEnabled) {
      throw new BadRequestError('MFA not enabled', ERROR_CODES.BAD_REQUEST);
    }

    if (!user.passwordHash) {
      throw new BadRequestError('Cannot regenerate for OAuth account', ERROR_CODES.BAD_REQUEST);
    }

    const isValidPassword = await passwordService.verify(user.passwordHash, password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid password', ERROR_CODES.USER_INVALID_PASSWORD);
    }

    const backupCodes = coreMfaService.generateBackupCodes();
    await userSecurityRepository.updateBackupCodes(userId, backupCodes);

    logger.info({ userId: user.publicId }, 'MFA backup codes regenerated');

    return backupCodes;
  },

  /**
   * Recover account using backup code
   */
  async recoverWithBackupCode(
    email: string,
    backupCode: string
  ): Promise<{ success: boolean; remainingCodes: number }> {
    const user = await userRepository.findWithSecurityByEmail(email);

    if (!user?.security?.mfaEnabled || !user.security.mfaBackupCodes.length) {
      throw new UnauthorizedError('Invalid recovery attempt', ERROR_CODES.AUTH_MFA_INVALID);
    }

    const result = coreMfaService.verifyBackupCode(user.security.mfaBackupCodes, backupCode);
    if (!result.valid) {
      throw new UnauthorizedError('Invalid backup code', ERROR_CODES.AUTH_MFA_INVALID);
    }

    await userSecurityRepository.updateBackupCodes(user.id, result.remainingCodes);
    await userSecurityRepository.disableMfa(user.id);
    await sessionRepository.revokeAllForUser(user.id, 'MFA recovery');

    logger.info({ userId: user.publicId }, 'Account recovered with backup code');

    return { success: true, remainingCodes: result.remainingCodes.length };
  },

  /**
   * Get MFA status
   */
  async getStatus(userId: bigint): Promise<MfaStatusDTO> {
    const user = await userRepository.findWithSecurity(userId);
    if (!user) {
      throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
    }

    return {
      enabled: user.security?.mfaEnabled ?? false,
      backupCodesRemaining: user.security?.mfaBackupCodes.length ?? 0,
    };
  },
} as const;

export type MfaDomainService = typeof mfaDomainService;