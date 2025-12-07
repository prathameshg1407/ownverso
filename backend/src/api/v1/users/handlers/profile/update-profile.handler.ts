/**
 * Update Profile Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userProfileService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import type { UpdateProfileRequest } from '../../schemas';

export async function updateProfileHandler(
  request: FastifyRequest<{ Body: UpdateProfileRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const profile = await userProfileService.updateProfile(getUserId(request), request.body);
  sendSuccess(reply, request, { profile });
}