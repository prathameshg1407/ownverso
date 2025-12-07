/**
 * Admin Update User Role Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { adminUserService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import type { AdminUpdateRoleRequest } from '../../schemas';

interface Params {
  userId: string;
}

export async function updateRoleHandler(
  request: FastifyRequest<{ Params: Params; Body: AdminUpdateRoleRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await adminUserService.updateUserRole(
    getUserId(request),
    request.params.userId,
    request.body.role,
  );
  sendSuccess(reply, request, { user });
}