// ==== FILE: src/api/v1/author/handlers/get-account.handler.ts ====
/**
 * Get Author Account Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../users/utils';

export async function getAccountHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const account = await authorService.getAccount(userId);
  sendSuccess(reply, request, { account });
}