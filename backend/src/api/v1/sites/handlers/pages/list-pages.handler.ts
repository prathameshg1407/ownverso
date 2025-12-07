// ==== FILE: src/api/v1/sites/handlers/pages/list-pages.handler.ts ====
/**
 * List Pages Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pageService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam } from '../../sites.schema';

export async function listPagesHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const pages = await pageService.listPages(siteId);
  sendSuccess(reply, request, { pages });
}