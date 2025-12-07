// ==== FILE: src/api/v1/auth/handlers/email.handlers.ts ====
/**
 * Email Handlers
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { emailVerificationService } from '@/domain/auth/services';
import { sendSuccess, sendMessage, getUserId } from '../utils';
import type { VerifyEmailRequest, RequestEmailChangeRequest, ConfirmEmailChangeRequest } from '../auth.schema';

export async function verifyEmailHandler(
  request: FastifyRequest<{ Body: VerifyEmailRequest }>,
  reply: FastifyReply
): Promise<void> {
  await emailVerificationService.verifyEmail(request.body.token, request.ip);
  sendMessage(reply, request, 'Email verified successfully.');
}

export async function resendVerificationHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  await emailVerificationService.resendVerification(getUserId(request), request.ip);
  sendMessage(reply, request, 'Verification email has been sent.');
}

export async function requestEmailChangeHandler(
  request: FastifyRequest<{ Body: RequestEmailChangeRequest }>,
  reply: FastifyReply
): Promise<void> {
  await emailVerificationService.requestEmailChange(getUserId(request), request.body.newEmail, request.ip);
  sendMessage(reply, request, 'Email change verification has been sent to the new email address.');
}

export async function confirmEmailChangeHandler(
  request: FastifyRequest<{ Body: ConfirmEmailChangeRequest }>,
  reply: FastifyReply
): Promise<void> {
  const result = await emailVerificationService.confirmEmailChange(request.body.token, request.ip);
  sendSuccess(reply, request, result);
}