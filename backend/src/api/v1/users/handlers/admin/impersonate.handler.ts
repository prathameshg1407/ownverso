/**
 * Admin Impersonate User Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { adminUserService } from '@/domain/users/services';
import { logger } from '@/core/logger';
import { sendSuccess, getUserId, getUserPublicId } from '../../utils';

interface Params {
  userId: string;
}

export async function impersonateHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
): Promise<void> {
  const adminUserId = getUserId(request);
  const adminPublicId = getUserPublicId(request);
  const targetUserId = request.params.userId;

  const result = await adminUserService.impersonateUser(adminUserId, targetUserId, {
    ipAddress: request.ip,
    userAgent: request.headers['user-agent'] ?? null,
  });

  logger.warn(
    {
      adminUserId: adminPublicId,
      targetUserId,
      impersonationId: result.impersonationId,
    },
    'Admin impersonation initiated',
  );

  sendSuccess(reply, request, {
    impersonationToken: result.token,
    impersonationId: result.impersonationId,
    expiresAt: result.expiresAt,
    targetUser: result.targetUser,
  });
}