// ==== FILE: src/api/v1/sites/handlers/settings/update-seo.handler.ts ====
/**
 * Update Site SEO Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, UpdateSiteSeoRequest } from '../../sites.schema';

export async function updateSeoHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteSeoRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const seo = await siteSettingsService.updateSeo(siteId, request.body);
  sendSuccess(reply, request, { seo });
}