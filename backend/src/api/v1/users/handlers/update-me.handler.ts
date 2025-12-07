/**
 * Update Current User Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../utils';
import type { UpdateUserRequest } from '../schemas';

export async function updateMeHandler(
  request: FastifyRequest<{ Body: UpdateUserRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await userService.updateUser(getUserId(request), request.body);
  sendSuccess(reply, request, { user });
}