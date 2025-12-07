// ==== FILE: src/api/v1/sites/handlers/settings/update-general.handler.ts ====
/**
 * Update Site General Settings Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteSettingsService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam, UpdateSiteGeneralRequest } from '../../sites.schema';

export async function updateGeneralHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: UpdateSiteGeneralRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const general = await siteSettingsService.updateGeneral(siteId, request.body);
  sendSuccess(reply, request, { general });
}