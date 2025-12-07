// ==== FILE: src/api/v1/admin/authors/handlers/update-platform-tier.handler.ts ====
/**
 * Admin Update Platform Tier Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { userRepository } from '@/domain/users/repositories';
import { authorAccountRepository } from '@/domain/authors/repositories';
import { authorAccountMapper } from '@/domain/authors/mappers';
import { sendSuccess } from '../../../users/utils';
import { logger } from '@/core/logger';
import type { AdminUpdatePlatformTierRequest } from '@/api/v1/author/author.schema';

export async function updatePlatformTierHandler(
  request: FastifyRequest<{
    Params: { userId: string };
    Body: AdminUpdatePlatformTierRequest;
  }>,
  reply: FastifyReply
): Promise<void> {
  const { userId: publicId } = request.params;
  const { tier, status, reason } = request.body;

  const user = await userRepository.findByPublicId(publicId);
  if (!user) {
    throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
  }

  const account = await authorAccountRepository.findByUserId(user.id);
  if (!account) {
    throw new NotFoundError('Author account not found', ERROR_CODES.AUTHOR_NOT_FOUND);
  }

  const updated = await authorAccountRepository.updatePlatformSubscription(user.id, {
    platformTier: tier,
    platformTierStatus: status,
  });

  logger.info(
    {
      adminId: request.user?.publicId,
      authorId: publicId,
      fromTier: account.platformTier,
      toTier: tier,
      reason,
    },
    'Author platform tier updated by admin'
  );

  sendSuccess(reply, request, {
    account: authorAccountMapper.toDTO(updated),
    message: `Platform tier updated to ${tier}`,
  });
}