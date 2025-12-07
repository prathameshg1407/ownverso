// ==== FILE: src/api/v1/sites/handlers/update-site.handler.ts ====
/**
 * Update Site Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import { sendSuccess } from '../../users/utils';
import type { SiteIdParam, UpdateSiteRequest } from '../sites.schema';

export async function updateSiteHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const site = await siteService.updateSite(siteId, request.body);
  sendSuccess(reply, request, { site });
}