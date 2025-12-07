// ==== FILE: src/api/v1/collaborator/handlers/list-sites.handler.ts ====
/**
 * List Collaborator Sites Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { collaboratorService } from '@/domain/sites/services';
import { sendSuccess, getUserId } from '../../users/utils';

export async function listCollaboratorSitesHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);
  const sites = await collaboratorService.getUserCollaborationSites(userId);
  sendSuccess(reply, request, { sites });
}