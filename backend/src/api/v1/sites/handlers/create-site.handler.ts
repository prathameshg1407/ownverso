// ==== FILE: src/api/v1/sites/handlers/create-site.handler.ts ====
/**
 * Create Site Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import { sendSuccess, getUserId } from '../../users/utils';
import type { CreateSiteRequest } from '../sites.schema';

export async function createSiteHandler(
  request: FastifyRequest<{ Body: CreateSiteRequest }>,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const site = await siteService.createSite({
    authorId: userId,
    ...request.body,
  });
  sendSuccess(reply, request, { site }, 201);
}