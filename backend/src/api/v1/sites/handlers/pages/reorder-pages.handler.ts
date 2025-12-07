// ==== FILE: src/api/v1/sites/handlers/pages/reorder-pages.handler.ts ====
/**
 * Reorder Pages Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pageService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, ReorderPagesRequest } from '../../sites.schema';

export async function reorderPagesHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: ReorderPagesRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const pages = await pageService.reorderPages(siteId, request.body);
  sendSuccess(reply, request, { pages });
}