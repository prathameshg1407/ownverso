/**
 * Get Public User by Public ID Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { publicUserService } from '@/domain/users/services';
import { sendSuccess } from '../../utils';

interface Params {
  publicId: string;
}

export async function getByPublicIdHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await publicUserService.getByPublicId(request.params.publicId);
  sendSuccess(reply, request, { user });
}