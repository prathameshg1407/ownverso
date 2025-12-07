/**
 * Delete Current User Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/domain/users/services';
import { sendNoContent, getUserId } from '../utils';

export async function deleteMeHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  await userService.initiateAccountDeletion(getUserId(request));
  sendNoContent(reply);
}