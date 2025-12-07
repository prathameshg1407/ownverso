// ==== FILE: src/api/v1/sites/handlers/domain/add-domain.handler.ts ====
/**
 * Add Domain Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteDomainService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, AddDomainRequest } from '../../sites.schema';

export async function addDomainHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: AddDomainRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const { customDomain } = request.body;
  const domain = await siteDomainService.addDomain(siteId, customDomain);
  sendSuccess(reply, request, { domain }, 201);
}