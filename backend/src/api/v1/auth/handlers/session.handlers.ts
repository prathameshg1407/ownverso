// ==== FILE: src/api/v1/auth/handlers/session.handlers.ts ====
/**
 * Session Handlers
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { sessionDomainService, sessionRepository } from '@/domain/auth';
import { BadRequestError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { sendSuccess, sendMessage, getUserId, getCurrentSessionId } from '../utils';

export async function getSessionsHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const [userId, currentSessionId] = await Promise.all([
    Promise.resolve(getUserId(request)),
    getCurrentSessionId(request, sessionRepository.findByTokenHash),
  ]);

  const sessions = await sessionDomainService.getActiveSessions(userId, currentSessionId);
  sendSuccess(reply, request, { sessions });
}

export async function revokeSessionHandler(
  request: FastifyRequest<{ Params: { sessionId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const [userId, currentSessionId] = await Promise.all([
    Promise.resolve(getUserId(request)),
    getCurrentSessionId(request, sessionRepository.findByTokenHash),
  ]);

  await sessionDomainService.revokeSession(userId, BigInt(request.params.sessionId), currentSessionId);
  sendMessage(reply, request, 'Session revoked successfully.');
}

export async function revokeOtherSessionsHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const currentSessionId = await getCurrentSessionId(request, sessionRepository.findByTokenHash);

  if (!currentSessionId) {
    throw new BadRequestError('Current session not found', ERROR_CODES.BAD_REQUEST);
  }

  const count = await sessionDomainService.revokeOtherSessions(getUserId(request), currentSessionId);
  sendSuccess(reply, request, { message: `Revoked ${count} session(s).`, sessionsRevoked: count });
}