/**
 * Admin Update User Status Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { adminUserService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import type { AdminUpdateStatusRequest } from '../../schemas';

interface Params {
  userId: string;
}

export async function updateStatusHandler(
  request: FastifyRequest<{ Params: Params; Body: AdminUpdateStatusRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await adminUserService.updateUserStatus(
    getUserId(request),
    request.params.userId,
    request.body.status,
    request.body.reason,
  );
  sendSuccess(reply, request, { user });
}