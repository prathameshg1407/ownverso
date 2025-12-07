// ==== FILE: src/api/v1/author/handlers/platform-subscription/list-plans.handler.ts ====
/**
 * List Platform Plans Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorPlatformSubService } from '@/domain/authors/services';
import { sendSuccess } from '../../../users/utils';

export async function listPlansHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const plans = await authorPlatformSubService.listPlans();
  sendSuccess(reply, request, { plans });
}