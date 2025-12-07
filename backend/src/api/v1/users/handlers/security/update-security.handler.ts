/**
 * Update Security Settings Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { userSecurityService } from '@/domain/users/services';
import { sendSuccess, getUserId } from '../../utils';
import type { UpdateSecurityRequest } from '../../schemas';

export async function updateSecurityHandler(
  request: FastifyRequest<{ Body: UpdateSecurityRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const security = await userSecurityService.updateSecuritySettings(
    getUserId(request),
    request.body,
  );
  sendSuccess(reply, request, { security });
}