/**
 * Get Security Info Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userSecurityService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';

export async function getSecurityHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const security = await userSecurityService.getSecurityInfo(getUserId(request));
  sendSuccess(reply, request, { security });
}