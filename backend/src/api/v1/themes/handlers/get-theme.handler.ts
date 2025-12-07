// ==== FILE: src/api/v1/themes/handlers/get-theme.handler.ts ====
/**
 * Get Theme Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { themeService } from '@/domain/sites/services';
import { sendSuccess } from '../../users/utils';
import type { ThemeIdParam } from '../../sites/sites.schema';

export async function getThemeHandler(
  request: FastifyRequest<{ Params: ThemeIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { themeId } = request.params;
  const theme = await themeService.getTheme(themeId);
  sendSuccess(reply, request, { theme });
}