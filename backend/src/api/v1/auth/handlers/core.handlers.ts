// ==== FILE: src/api/v1/auth/handlers/core.handlers.ts ====
/**
 * Core Auth Handlers
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authService } from '@/domain/auth/services';
import { UnauthorizedError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import {
  sendSuccess,
  sendNoContent,
  sendAuthResponse,
  sendMfaPendingResponse,
  sendTokensResponse,
  getDeviceInfo,
  getUserId,
  getClientType,
  extractAccessToken,
  extractRefreshToken,
} from '../utils';
import type { RegisterRequest, LoginRequest } from '../auth.schema';

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterRequest }>,
  reply: FastifyReply
): Promise<void> {
  const result = await authService.register(request.body, getDeviceInfo(request));
  sendSuccess(reply, request, result, { statusCode: 201 });
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
): Promise<void> {
  const result = await authService.login(request.body, getDeviceInfo(request));

  if (result.mfaRequired && result.mfaPendingToken) {
    sendMfaPendingResponse(reply, request, {
      user: result.user,
      mfaPendingToken: result.mfaPendingToken,
    });
    return;
  }

  sendAuthResponse(reply, request, {
    user: result.user,
    tokens: result.tokens,
    mfaRequired: false,
  });
}

export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const token = extractAccessToken(request);
  if (token) await authService.logout(token);

  if (getClientType(request) === 'web') {
    reply.clearAuthCookies();
  }

  sendNoContent(reply);
}

export async function logoutAllHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const count = await authService.logoutAll(getUserId(request));
  reply.clearAuthCookies();
  sendSuccess(reply, request, { message: `Logged out from ${count} device(s)`, sessionsRevoked: count });
}

export async function refreshHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const refreshToken = extractRefreshToken(request);

  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token required', ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID);
  }

  const tokens = await authService.refreshTokens(refreshToken);
  sendTokensResponse(reply, request, tokens);
}

export async function getMeHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const { user } = request;

  if (!user?.publicId) {
    throw new UnauthorizedError('User not found in request', ERROR_CODES.AUTH_REQUIRED);
  }

  sendSuccess(reply, request, {
    user: {
      publicId: user.publicId,
      email: user.email,
      emailVerified: user.emailVerified,
      username: user.username,
      displayName: user.displayName || user.username || 'User',
      role: user.role,
      status: user.status,
      createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
      profile: user.profile
        ? {
            avatarUrl: user.profile.avatarUrl ?? undefined,
            bio: user.profile.bio ?? undefined,
            locale: user.profile.locale || 'en',
            timezone: user.profile.timezone || 'UTC',
          }
        : undefined,
    },
  });
}