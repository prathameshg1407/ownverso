// ==== FILE: src/api/v1/author/handlers/platform-subscription/reactivate.handler.ts ====
/**
 * Reactivate Platform Subscription Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorPlatformSubService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../../users/utils';

export async function reactivateHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const subscription = await authorPlatformSubService.reactivate(userId);
  sendSuccess(reply, request, { subscription, message: 'Subscription reactivated' });
}