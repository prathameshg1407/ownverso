// ==== FILE: src/api/v1/sites/handlers/domain/remove-domain.handler.ts ====
/**
 * Remove Domain Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteDomainService } from '@/domain/sites/services';
import type { SiteIdParam } from '../../sites.schema';

export async function removeDomainHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  await siteDomainService.removeDomain(siteId);
  reply.status(204).send();
}