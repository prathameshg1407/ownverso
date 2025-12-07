// ==== FILE: src/api/v1/author/handlers/platform-subscription/cancel.handler.ts ====
/**
 * Cancel Platform Subscription Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorPlatformSubService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../../users/utils';

export async function cancelHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const subscription = await authorPlatformSubService.cancel(userId);
  sendSuccess(reply, request, { subscription, message: 'Subscription cancelled' });
}