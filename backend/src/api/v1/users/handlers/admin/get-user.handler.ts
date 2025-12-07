/**
 * Admin Get User Detail Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { adminUserService } from '@/domain/users/services';
import { sendSuccess } from '../../utils';

interface Params {
  userId: string;
}

export async function getUserHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await adminUserService.getUserDetail(request.params.userId);
  sendSuccess(reply, request, { user });
}