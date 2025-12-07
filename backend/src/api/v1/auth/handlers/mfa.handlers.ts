// ==== FILE: src/api/v1/auth/handlers/mfa.handlers.ts ====
/**
 * MFA Handlers
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authService, mfaDomainService } from '@/domain/auth/services';
import { sendSuccess, sendMessage, sendAuthResponse, getUserId } from '../utils';
import type { MfaVerifySetupRequest, MfaDisableRequest, MfaVerifyLoginRequest } from '../auth.schema';

export async function mfaSetupInitHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const setup = await mfaDomainService.initSetup(getUserId(request));
  sendSuccess(reply, request, setup);
}

export async function mfaSetupVerifyHandler(
  request: FastifyRequest<{ Body: MfaVerifySetupRequest }>,
  reply: FastifyReply
): Promise<void> {
  const result = await mfaDomainService.verifySetup(getUserId(request), request.body.code);
  sendSuccess(reply, request, result);
}

export async function mfaDisableHandler(
  request: FastifyRequest<{ Body: MfaDisableRequest }>,
  reply: FastifyReply
): Promise<void> {
  await mfaDomainService.disable(getUserId(request), request.body.password, request.body.code);
  sendMessage(reply, request, 'Two-factor authentication has been disabled.');
}

export async function mfaVerifyLoginHandler(
  request: FastifyRequest<{ Body: MfaVerifyLoginRequest }>,
  reply: FastifyReply
): Promise<void> {
  const result = await authService.verifyMfaLogin(request.body.mfaPendingToken, request.body.code);
  sendAuthResponse(reply, request, { user: result.user, tokens: result.tokens, mfaRequired: false });
}

export async function mfaStatusHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const status = await mfaDomainService.getStatus(getUserId(request));
  sendSuccess(reply, request, status);
}

export async function mfaRegenerateCodesHandler(
  request: FastifyRequest<{ Body: { password: string } }>,
  reply: FastifyReply
): Promise<void> {
  const backupCodes = await mfaDomainService.regenerateBackupCodes(getUserId(request), request.body.password);
  sendSuccess(reply, request, { backupCodes });
}