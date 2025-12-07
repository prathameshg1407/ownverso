// ==== FILE: src/api/v1/author/handlers/platform-subscription/subscribe.handler.ts ====
/**
 * Subscribe to Platform Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { BillingCycle } from '@prisma/client';
import { authorPlatformSubService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../../users/utils';
import type { SubscribePlatformRequest } from '../../author.schema';

// Map schema billing cycle to Prisma BillingCycle enum
function mapBillingCycle(cycle: 'MONTHLY' | 'YEARLY'): BillingCycle {
  return cycle === 'YEARLY' ? 'ANNUAL' : 'MONTHLY';
}

export async function subscribeHandler(
  request: FastifyRequest<{ Body: SubscribePlatformRequest }>,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const { tier, billingCycle } = request.body;

  const subscription = await authorPlatformSubService.subscribe(
    userId,
    tier,
    mapBillingCycle(billingCycle)
  );

  sendSuccess(reply, request, { subscription }, 201);
}