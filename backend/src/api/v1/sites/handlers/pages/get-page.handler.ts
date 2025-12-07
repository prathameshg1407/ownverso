// ==== FILE: src/api/v1/sites/handlers/pages/get-page.handler.ts ====
/**
 * Get Page Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pageService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { PageIdParam } from '../../sites.schema';

export async function getPageHandler(
  request: FastifyRequest<{ Params: PageIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { pageId } = request.params;
  const page = await pageService.getPage(pageId);
  sendSuccess(reply, request, { page });
}