/**
 * Update Preferences Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userPreferencesService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import type { UpdatePreferencesRequest } from '../../schemas';

export async function updatePreferencesHandler(
  request: FastifyRequest<{ Body: UpdatePreferencesRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const preferences = await userPreferencesService.updatePreferences(
    getUserId(request),
    request.body,
  );
  sendSuccess(reply, request, { preferences });
}