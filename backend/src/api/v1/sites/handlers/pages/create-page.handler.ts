// ==== FILE: src/api/v1/sites/handlers/pages/create-page.handler.ts ====
/**
 * Create Page Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pageService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, CreatePageRequest } from '../../sites.schema';

export async function createPageHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: CreatePageRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const page = await pageService.createPage({
    siteId,
    ...request.body,
  });
  sendSuccess(reply, request, { page }, 201);
}