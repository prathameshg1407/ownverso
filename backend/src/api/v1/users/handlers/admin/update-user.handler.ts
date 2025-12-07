/**
 * Admin Update User Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { adminUserService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import type { AdminUpdateUserRequest } from '../../schemas';

interface Params {
  userId: string;
}

export async function updateUserHandler(
  request: FastifyRequest<{ Params: Params; Body: AdminUpdateUserRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await adminUserService.updateUser(
    getUserId(request),
    request.params.userId,
    request.body,
  );
  sendSuccess(reply, request, { user });
}