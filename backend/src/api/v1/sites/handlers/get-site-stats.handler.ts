// ==== FILE: src/api/v1/sites/handlers/get-site-stats.handler.ts ====
/**
 * Get Site Stats Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import { sendSuccess } from '../../users/utils';
import type { SiteIdParam } from '../sites.schema';

export async function getSiteStatsHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const stats = await siteService.getSiteStats(siteId);
  sendSuccess(reply, request, { stats });
}