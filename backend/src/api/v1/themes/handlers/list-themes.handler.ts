// ==== FILE: src/api/v1/themes/handlers/list-themes.handler.ts ====
/**
 * List Themes Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { themeService } from '@/domain/sites/services';
import { sendSuccess, getUserId } from '../../users/utils';

export async function listThemesHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const themes = await themeService.listThemes(userId);
  sendSuccess(reply, request, { themes });
}