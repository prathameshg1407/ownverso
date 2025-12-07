// ==== FILE: src/api/v1/author/handlers/platform-subscription/get-subscription.handler.ts ====
/**
 * Get Platform Subscription Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorPlatformSubService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../../users/utils';

export async function getSubscriptionHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const subscription = await authorPlatformSubService.getSubscription(userId);
  sendSuccess(reply, request, { subscription });
}