// ==== FILE: src/api/v1/sites/handlers/list-sites.handler.ts ====
/**
 * List Sites Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteService } from '@/domain/sites/services';
import { sendSuccess, getUserId } from '../../users/utils';

export async function listSitesHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const sites = await siteService.listAuthorSites(userId);
  sendSuccess(reply, request, { sites });
}