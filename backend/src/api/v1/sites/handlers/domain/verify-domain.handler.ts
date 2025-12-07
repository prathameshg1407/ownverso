// ==== FILE: src/api/v1/sites/handlers/domain/verify-domain.handler.ts ====
/**
 * Verify Domain Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteDomainService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam } from '../../sites.schema';

export async function verifyDomainHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const domain = await siteDomainService.verifyDomain(siteId);
  sendSuccess(reply, request, { domain });
}