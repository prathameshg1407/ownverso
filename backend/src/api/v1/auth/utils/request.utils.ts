// ==== FILE: src/api/v1/auth/utils/request.utils.ts ====
/**
 * Auth Request Utilities
 */

import type { FastifyRequest } from 'fastify';
import type { DeviceType } from '@prisma/client';
import { UnauthorizedError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import type { AuthenticatedUser } from '@/types/fastify';
import type { DeviceInfo } from '@/domain/auth/types/auth.types';
import { config } from '@/config';
import { hashToken } from '@/domain/auth/utils/crypto.utils';

export type ClientType = 'web' | 'mobile' | 'api';

// ─────────────────────────────────────────────────────────────────────────
// User Extraction
// ─────────────────────────────────────────────────────────────────────────

export function getAuthenticatedUser(request: FastifyRequest): AuthenticatedUser {
  if (!request.user) {
    throw new UnauthorizedError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }
  return request.user;
}

export function getUserId(request: FastifyRequest): bigint {
  return getAuthenticatedUser(request).id;
}

export function getUserPublicId(request: FastifyRequest): string {
  return getAuthenticatedUser(request).publicId;
}

// ─────────────────────────────────────────────────────────────────────────
// Device Info
// ─────────────────────────────────────────────────────────────────────────

const DEFAULT_DEVICE_TYPE: DeviceType = 'UNKNOWN';

export function getDeviceInfo(request: FastifyRequest): DeviceInfo {
  if (request.deviceInfo) return request.deviceInfo;

  return {
    userAgent: request.headers['user-agent'] ?? null,
    ipAddress: request.ip ?? null,
    deviceType: DEFAULT_DEVICE_TYPE,
    deviceOs: null,
    browser: null,
    country: null,
    city: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Token Extraction
// ─────────────────────────────────────────────────────────────────────────

export function extractRefreshToken(request: FastifyRequest): string | null {
  const body = request.body as { refreshToken?: string } | undefined;
  return body?.refreshToken ?? request.cookies[config.auth.cookies.refreshToken.name] ?? null;
}

export function extractAccessToken(request: FastifyRequest): string | null {
  const auth = request.headers.authorization;
  return auth?.startsWith('Bearer ') ? auth.slice(7) : null;
}

export async function getCurrentSessionId(
  request: FastifyRequest,
  findByTokenHash: (hash: string) => Promise<{ id: bigint } | null>
): Promise<bigint | undefined> {
  const token = extractAccessToken(request);
  if (!token) return undefined;
  const session = await findByTokenHash(hashToken(token));
  return session?.id;
}

// ─────────────────────────────────────────────────────────────────────────
// Client Type Detection
// ─────────────────────────────────────────────────────────────────────────

export function getClientType(request: FastifyRequest): ClientType {
  const header = request.headers['x-client-type'];
  if (header === 'web' || header === 'mobile' || header === 'api') return header;

  const ua = request.headers['user-agent'] ?? '';
  if (/Mobile|Android|iPhone|iPad/i.test(ua)) return 'mobile';
  if (/Mozilla|Chrome|Safari|Firefox/i.test(ua)) return 'web';
  return 'api';
}