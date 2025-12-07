/**
 * Get Public User by Username Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { publicUserService } from '@/domain/users/services';
import { sendSuccess } from '../../utils';

interface Params {
  username: string;
}

export async function getByUsernameHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await publicUserService.getByUsername(request.params.username);
  sendSuccess(reply, request, { user });
}