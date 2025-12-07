// ==== FILE: src/api/v1/auth/utils/response.utils.ts ====
/**
 * Auth Response Utilities
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { TokenPair, UserDTO } from '@/domain/auth/types/auth.types';
import { getClientType } from './request.utils';

export interface AuthResponseData {
  user: UserDTO;
  tokens: TokenPair;
  mfaRequired?: boolean;
}

export interface MfaPendingData {
  user: UserDTO;
  mfaPendingToken: string;
}

interface SuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
  requestId: string;
}

function buildResponse<T>(request: FastifyRequest, data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    requestId: request.id,
  };
}

export function sendSuccess<T>(
  reply: FastifyReply,
  request: FastifyRequest,
  data: T,
  options: { statusCode?: number } = {}
): void {
  reply.status(options.statusCode ?? 200).send(buildResponse(request, data));
}

export function sendMessage(
  reply: FastifyReply,
  request: FastifyRequest,
  message: string,
  statusCode = 200
): void {
  sendSuccess(reply, request, { message }, { statusCode });
}

export function sendNoContent(reply: FastifyReply): void {
  reply.status(204).send();
}

function formatTokens(tokens: TokenPair) {
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    accessTokenExpiresAt: tokens.accessTokenExpiresAt.toISOString(),
    refreshTokenExpiresAt: tokens.refreshTokenExpiresAt.toISOString(),
  };
}

export function sendAuthResponse(
  reply: FastifyReply,
  request: FastifyRequest,
  data: AuthResponseData
): void {
  if (getClientType(request) === 'web') {
    reply.setAuthCookies(data.tokens.accessToken, data.tokens.refreshToken);
  }

  sendSuccess(reply, request, {
    user: data.user,
    tokens: formatTokens(data.tokens),
    mfaRequired: data.mfaRequired ?? false,
  });
}

export function sendMfaPendingResponse(
  reply: FastifyReply,
  request: FastifyRequest,
  data: MfaPendingData
): void {
  sendSuccess(reply, request, {
    user: data.user,
    mfaRequired: true,
    mfaPendingToken: data.mfaPendingToken,
  });
}

export function sendTokensResponse(
  reply: FastifyReply,
  request: FastifyRequest,
  tokens: TokenPair
): void {
  if (getClientType(request) === 'web') {
    reply.setAuthCookies(tokens.accessToken, tokens.refreshToken);
  }
  sendSuccess(reply, request, { tokens: formatTokens(tokens) });
}