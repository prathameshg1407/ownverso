// ==== FILE: src/api/v1/sites/handlers/pages/delete-page.handler.ts ====
/**
 * Delete Page Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pageService } from '@/domain/sites/services';
import type { PageIdParam } from '../../sites.schema';

export async function deletePageHandler(
  request: FastifyRequest<{ Params: PageIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { pageId } = request.params;
  await pageService.deletePage(pageId);
  reply.status(204).send();
}