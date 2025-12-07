// ==== FILE: src/api/v1/sites/handlers/settings/get-settings.handler.ts ====
/**
 * Get Site Settings Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam } from '../../sites.schema';

export async function getSettingsHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const settings = await siteSettingsService.getSettings(siteId);
  sendSuccess(reply, request, { settings });
}