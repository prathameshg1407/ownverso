// ==== FILE: src/api/v1/sites/handlers/delete-site.handler.ts ====
/**
 * Delete Site Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import type { SiteIdParam } from '../sites.schema';

export async function deleteSiteHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  await siteService.deleteSite(siteId);
  reply.status(204).send();
}