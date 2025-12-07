// ==== FILE: src/api/v1/sites/handlers/get-site.handler.ts ====
/**
 * Get Site Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import { sendSuccess } from '../../users/utils';
import type { SiteIdParam } from '../sites.schema';

export async function getSiteHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const site = await siteService.getSite(siteId);
  sendSuccess(reply, request, { site });
}