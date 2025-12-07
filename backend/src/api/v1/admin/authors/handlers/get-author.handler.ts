// ==== FILE: src/api/v1/admin/authors/handlers/get-author.handler.ts ====
/**
 * Admin Get Author Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { userRepository } from '@/domain/users/repositories';
import { authorAccountRepository } from '@/domain/authors/repositories';
import { adminAuthorMapper } from '@/domain/authors/mappers';
import { sendSuccess } from '../../../users/utils';

export async function getAuthorHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const { userId: publicId } = request.params;

  const user = await userRepository.findByPublicId(publicId);
  if (!user) {
    throw new NotFoundError('User not found', ERROR_CODES.USER_NOT_FOUND);
  }

  const account = await authorAccountRepository.findByUserIdWithUser(user.id);
  if (!account) {
    throw new NotFoundError('Author account not found', ERROR_CODES.AUTHOR_NOT_FOUND);
  }

  const author = adminAuthorMapper.toDetailDTO(account);
  sendSuccess(reply, request, { author });
}