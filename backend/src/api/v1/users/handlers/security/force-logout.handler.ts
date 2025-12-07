/**
 * Force Logout All Devices Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userSecurityService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';

export async function forceLogoutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const revokedCount = await userSecurityService.forceLogoutAll(getUserId(request));

  sendSuccess(reply, request, {
    message: `Successfully logged out from ${revokedCount} device(s)`,
    sessionsRevoked: revokedCount,
  });
}