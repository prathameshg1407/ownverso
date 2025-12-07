// ==== FILE: src/api/v1/sites/handlers/get-site-overview.handler.ts ====
/**
 * Get Site Overview Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import { sendSuccess } from '../../users/utils';
import type { SiteIdParam } from '../sites.schema';

export async function getSiteOverviewHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const overview = await siteService.getSiteOverview(siteId);
  sendSuccess(reply, request, overview);
}