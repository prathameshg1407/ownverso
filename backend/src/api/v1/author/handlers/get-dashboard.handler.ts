// ==== FILE: src/api/v1/author/handlers/get-dashboard.handler.ts ====
/**
 * Get Author Dashboard Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../users/utils';

export async function getDashboardHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const dashboard = await authorService.getDashboard(userId);
  sendSuccess(reply, request, { dashboard });
}