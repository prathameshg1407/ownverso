// ==== FILE: src/api/v1/author/handlers/platform-subscription/change-plan.handler.ts ====
/**
 * Change Platform Plan Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorPlatformSubService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../../users/utils';
import type { ChangePlatformPlanRequest } from '../../author.schema';

export async function changePlanHandler(
  request: FastifyRequest<{ Body: ChangePlatformPlanRequest }>,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const { tier } = request.body;

  const subscription = await authorPlatformSubService.changePlan(userId, tier);
  sendSuccess(reply, request, { subscription });
}