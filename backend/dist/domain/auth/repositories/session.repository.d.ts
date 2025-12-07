/**
 * Session Repository
 * Data access layer for user sessions
 */
import type { Session } from '@prisma/client';
import type { CreateSessionInput } from '../types/auth.types';
export declare const sessionRepository: {
    readonly create: (input: CreateSessionInput) => Promise<Session>;
    readonly findById: (id: bigint) => Promise<Session | null>;
    readonly findByIdMinimal: (id: bigint) => Promise<{
        id: bigint;
        isRevoked: boolean;
        expiresAt: Date;
    } | null>;
    readonly findByTokenHash: (tokenHash: string) => Promise<Session | null>;
    readonly findByRefreshTokenHash: (refreshTokenHash: string) => Promise<Session | null>;
    readonly findByAccessToken: (accessToken: string) => Promise<Session | null>;
    readonly findByRefreshToken: (refreshToken: string) => Promise<Session | null>;
    readonly findActiveByUserId: (userId: bigint) => Promise<Session[]>;
    readonly findActiveByUserIdMinimal: (userId: bigint) => Promise<Array<Omit<Session, "tokenHash" | "refreshTokenHash">>>;
    readonly updateLastActive: (id: bigint) => Promise<void>;
    readonly updateTokens: (id: bigint, tokenHash: string, refreshTokenHash: string, expiresAt: Date) => Promise<void>;
    readonly revoke: (id: bigint, reason?: string) => Promise<void>;
    readonly revokeByTokenHash: (tokenHash: string, reason?: string) => Promise<void>;
    readonly revokeAllForUser: (userId: bigint, reason?: string) => Promise<number>;
    readonly revokeAllExcept: (userId: bigint, exceptSessionId: bigint, reason?: string) => Promise<number>;
    readonly countActiveForUser: (userId: bigint) => Promise<number>;
    readonly cleanupExpired: () => Promise<number>;
    readonly enforceSessionLimit: (userId: bigint) => Promise<void>;
    readonly getActiveSessionIds: (userId: bigint) => Promise<bigint[]>;
};
export type SessionRepository = typeof sessionRepository;
//# sourceMappingURL=session.repository.d.ts.map