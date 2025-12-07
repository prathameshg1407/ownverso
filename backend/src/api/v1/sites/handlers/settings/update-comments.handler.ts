// ==== FILE: src/api/v1/sites/handlers/settings/update-comments.handler.ts ====
/**
 * Update Site Comments Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, UpdateSiteCommentsRequest } from '../../sites.schema';

export async function updateCommentsHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteCommentsRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const comments = await siteSettingsService.updateComments(siteId, request.body);
  sendSuccess(reply, request, { comments });
}