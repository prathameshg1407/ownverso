// ==== FILE: src/api/v1/sites/handlers/collaborators/get-collaborator.handler.ts ====
/**
 * Get Collaborator Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { CollaboratorIdParam } from '../../sites.schema';

export async function getCollaboratorHandler(
  request: FastifyRequest<{ Params: CollaboratorIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { collaboratorId } = request.params;
  const collaborator = await collaboratorService.getCollaborator(BigInt(collaboratorId));
  sendSuccess(reply, request, { collaborator });
}