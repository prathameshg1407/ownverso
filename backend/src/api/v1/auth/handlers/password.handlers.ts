// ==== FILE: src/api/v1/auth/handlers/password.handlers.ts ====
/**
 * Password Handlers
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { passwordDomainService } from '@/domain/auth/services';
import { sessionRepository } from '@/domain/auth/repositories';
import { sendSuccess, sendMessage, getUserId, getCurrentSessionId } from '../utils';
import type { ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest } from '../auth.schema';

export async function forgotPasswordHandler(
  request: FastifyRequest<{ Body: ForgotPasswordRequest }>,
  reply: FastifyReply
): Promise<void> {
  await passwordDomainService.requestReset(request.body.email, request.ip);
  sendMessage(reply, request, 'If an account exists with this email, a password reset link has been sent.');
}

export async function resetPasswordHandler(
  request: FastifyRequest<{ Body: ResetPasswordRequest }>,
  reply: FastifyReply
): Promise<void> {
  await passwordDomainService.resetPassword(request.body.token, request.body.newPassword, request.ip);
  sendMessage(reply, request, 'Password reset successfully. Please login with your new password.');
}

export async function changePasswordHandler(
  request: FastifyRequest<{ Body: ChangePasswordRequest }>,
  reply: FastifyReply
): Promise<void> {
  const [userId, currentSessionId] = await Promise.all([
    Promise.resolve(getUserId(request)),
    getCurrentSessionId(request, sessionRepository.findByTokenHash),
  ]);

  await passwordDomainService.changePassword(
    userId,
    request.body.currentPassword,
    request.body.newPassword,
    currentSessionId
  );

  sendMessage(reply, request, 'Password changed successfully.');
}

export async function checkPasswordStrengthHandler(
  request: FastifyRequest<{ Querystring: { password: string } }>,
  reply: FastifyReply
): Promise<void> {
  const strength = passwordDomainService.checkStrength(request.query.password);
  sendSuccess(reply, request, strength);
}