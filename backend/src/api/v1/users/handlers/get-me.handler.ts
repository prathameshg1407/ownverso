/**
 * Get Current User Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../utils';

export async function getMeHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const user = await userService.getCurrentUser(getUserId(request));
  sendSuccess(reply, request, { user });
}