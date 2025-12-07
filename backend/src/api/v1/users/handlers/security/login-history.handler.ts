/**
 * Login History Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userSecurityService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import { getSessionId } from '../../utils/request.utils';

export async function loginHistoryHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const currentSessionId = getSessionId(request);
  const sessions = await userSecurityService.getLoginHistory(getUserId(request), currentSessionId);

  sendSuccess(reply, request, { sessions });
}