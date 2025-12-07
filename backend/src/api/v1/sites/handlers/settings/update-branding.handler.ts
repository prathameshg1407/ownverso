// ==== FILE: src/api/v1/sites/handlers/settings/update-branding.handler.ts ====
/**
 * Update Site Branding Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, UpdateSiteBrandingRequest } from '../../sites.schema';

export async function updateBrandingHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteBrandingRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const branding = await siteSettingsService.updateBranding(siteId, request.body);
  sendSuccess(reply, request, { branding });
}