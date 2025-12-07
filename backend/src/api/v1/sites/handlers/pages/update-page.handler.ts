// ==== FILE: src/api/v1/sites/handlers/pages/update-page.handler.ts ====
/**
 * Update Page Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pageService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { PageIdParam, UpdatePageRequest } from '../../sites.schema';

export async function updatePageHandler(
  request: FastifyRequest<{ Params: PageIdParam; Body: UpdatePageRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { pageId } = request.params;
  const page = await pageService.updatePage(pageId, request.body);
  sendSuccess(reply, request, { page });
}