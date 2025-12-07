/**
 * Delete Avatar Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userProfileService } from '@/domain/users/services';
import { sendNoContent, getUserId } from '../../utils';

export async function deleteAvatarHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  await userProfileService.removeAvatar(getUserId(request));
  sendNoContent(reply);
}