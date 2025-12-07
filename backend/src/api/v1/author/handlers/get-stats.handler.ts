// ==== FILE: src/api/v1/author/handlers/get-stats.handler.ts ====
/**
 * Get Author Stats Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../users/utils';

export async function getStatsHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const stats = await authorService.getStats(userId);
  sendSuccess(reply, request, { stats });
}