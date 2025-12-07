/**
 * Get Preferences Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userPreferencesService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';

export async function getPreferencesHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const preferences = await userPreferencesService.getPreferences(getUserId(request));
  sendSuccess(reply, request, { preferences });
}