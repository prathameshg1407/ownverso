// ==== FILE: src/api/v1/sites/handlers/collaborators/list-collaborators.handler.ts (CONTINUED) ====
/**
 * List Collaborators Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import { sendSuccess } from '../../../users/utils';
import type { SiteIdParam } from '../../sites.schema';

export async function listCollaboratorsHandler(
  request: FastifyRequest<{ Params: SiteIdParam }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const collaborators = await collaboratorService.listCollaborators(siteId);
  sendSuccess(reply, request, { collaborators });
}