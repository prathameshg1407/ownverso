// ==== FILE: src/api/v1/sites/handlers/collaborators/invite-collaborator.handler.ts ====
/**
 * Invite Collaborator Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import { sendSuccess, getUserId } from '../../../users/utils';
import type { SiteIdParam, InviteCollaboratorRequest } from '../../sites.schema';

export async function inviteCollaboratorHandler(
  request: FastifyRequest<{ Params: SiteIdParam; Body: InviteCollaboratorRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const userId = getUserId(request);
  
  const invite = await collaboratorService.inviteCollaborator(
    {
      siteId,
      ...request.body,
    },
    userId
  );
  
  sendSuccess(reply, request, { invite }, 201);
}