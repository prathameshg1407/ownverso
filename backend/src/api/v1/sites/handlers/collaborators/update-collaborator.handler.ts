// ==== FILE: src/api/v1/sites/handlers/collaborators/update-collaborator.handler.ts ====
/**
 * Update Collaborator Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { CollaboratorIdParam, UpdateCollaboratorRequest } from '../../sites.schema';

export async function updateCollaboratorHandler(
  request: FastifyRequest<{ Params: CollaboratorIdParam; Body: UpdateCollaboratorRequest }>,
  reply: FastifyReply
): Promise<void> {
  const { collaboratorId } = request.params;
  const collaborator = await collaboratorService.updateCollaborator(
    BigInt(collaboratorId),
    request.body
  );
  sendSuccess(reply, request, { collaborator });
}