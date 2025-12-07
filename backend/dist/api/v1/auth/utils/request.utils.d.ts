/**
 * Auth Request Utilities
 */
import type { FastifyRequest } from 'fastify';
import type { AuthenticatedUser } from '@/types/fastify';
import type { DeviceInfo } from '../../../../domain/auth/types/auth.types';
export type ClientType = 'web' | 'mobile' | 'api';
export declare function getAuthenticatedUser(request: FastifyRequest): AuthenticatedUser;
export declare function getUserId(request: FastifyRequest): bigint;
export declare function getUserPublicId(request: FastifyRequest): string;
export declare function getDeviceInfo(request: FastifyRequest): DeviceInfo;
export declare function extractRefreshToken(request: FastifyRequest): string | null;
export declare function extractAccessToken(request: FastifyRequest): string | null;
export declare function getCurrentSessionId(request: FastifyRequest, findByTokenHash: (hash: string) => Promise<{
    id: bigint;
} | null>): Promise<bigint | undefined>;
export declare function getClientType(request: FastifyRequest): ClientType;
//# sourceMappingURL=request.utils.d.ts.map