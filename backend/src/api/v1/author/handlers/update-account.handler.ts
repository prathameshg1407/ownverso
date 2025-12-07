// ==== FILE: src/api/v1/author/handlers/update-account.handler.ts ====
/**
 * Update Author Account Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../users/utils';
import type { UpdateAuthorAccountRequest } from '../author.schema';

export async function updateAccountHandler(
  request: FastifyRequest<{ Body: UpdateAuthorAccountRequest }>,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const account = await authorService.updateAccount(userId, request.body);
  sendSuccess(reply, request, { account });
}