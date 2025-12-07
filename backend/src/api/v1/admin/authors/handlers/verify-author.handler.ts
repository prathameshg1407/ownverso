// ==== FILE: src/api/v1/admin/authors/handlers/verify-author.handler.ts ====
/**
 * Admin Verify Author Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { userRepository } from '@/domain/users/repositories';
import { authorAccountRepository } from '@/domain/authors/repositories';
import { authorAccountMapper } from '@/domain/authors/mappers';
import { sendSuccess } from '../../../users/utils';
import { logger } from '@/core/logger';
import type { AdminVerifyAuthorRequest } from '@/api/v1/author/author.schema';

export async function verifyAuthorHandler(
  request: FastifyRequest<{
    Params: { userId: string };
    Body: AdminVerifyAuthorRequest;
  }>,
  reply: FastifyReply
): Promise<void> {
  const { userId: publicId } = request.params;
  const { isVerified, note } = request.body;

  const user = await userRepository.findByPublicId(publicId);
  if (!user) {
    throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
  }

  const exists = await authorAccountRepository.exists(user.id);
  if (!exists) {
    throw new NotFoundError('Author account not found', ERROR_CODES.AUTHOR_NOT_FOUND);
  }

  const updated = await authorAccountRepository.updateVerification(
    user.id,
    isVerified,
    note
  );

  logger.info(
    {
      adminId: request.user?.publicId,
      authorId: publicId,
      isVerified,
    },
    'Author verification status updated'
  );

  sendSuccess(reply, request, {
    account: authorAccountMapper.toDTO(updated),
    message: isVerified ? 'Author verified successfully' : 'Author verification removed',
  });
}