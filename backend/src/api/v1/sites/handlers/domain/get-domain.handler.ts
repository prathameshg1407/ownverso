// ==== FILE: src/api/v1/sites/handlers/domain/get-domain.handler.ts ====
/**
 * Get Site Domain Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteDomainService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam } from '../../sites.schema';

export async function getDomainHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const domain = await siteDomainService.getDomain(siteId);
  sendSuccess(reply, request, { domain });
}