// ==== FILE: src/api/v1/sites/handlers/settings/update-analytics.handler.ts ====
/**
 * Update Site Analytics Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, UpdateSiteAnalyticsRequest } from '../../sites.schema';

export async function updateAnalyticsHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteAnalyticsRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const analytics = await siteSettingsService.updateAnalytics(siteId, request.body);
  sendSuccess(reply, request, { analytics });
}