// ==== FILE: src/api/v1/sites/handlers/settings/update-theme.handler.ts ====
/**
 * Update Site Theme Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, UpdateSiteThemeRequest } from '../../sites.schema';

export async function updateThemeHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteThemeRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const theme = await siteSettingsService.updateTheme(siteId, request.body);
  sendSuccess(reply, request, { theme });
}