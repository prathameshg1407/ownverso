// ==== FILE: src/api/v1/collaborator/handlers/accept-invite.handler.ts ====
/**
 * Accept Collaborator Invite Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import { sendSuccess, getUserId } from '../../users/utils';
import type { InviteTokenParam } from '../collaborator.schema';

export async function acceptInviteHandler(
  request: FastifyRequest<{ Params: InviteTokenParam }>,
  reply: FastifyReply
): Promise<void> {
  const { token } = request.params;
  const userId = getUserId(request);
  
  const collaborator = await collaboratorService.acceptInvite(token, userId);
  sendSuccess(reply, request, { collaborator });
}