// ==== FILE: src/api/v1/sites/handlers/collaborators/remove-collaborator.handler.ts ====
/**
 * Remove Collaborator Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import type { CollaboratorIdParam } from '../../sites.schema';

export async function removeCollaboratorHandler(
  request: FastifyRequest<{ Params: CollaboratorIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { collaboratorId } = request.params;
  await collaboratorService.removeCollaborator(BigInt(collaboratorId));
  reply.status(204).send();
}
