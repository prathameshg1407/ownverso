/**
 * Session Domain Service
 * Session management operations with caching
 */
import type { SessionDTO } from '../types/auth.types';
export declare const sessionDomainService: {
    /**
     * Get all active sessions for a user (cached)
     */
    readonly getActiveSessions: (userId: bigint, currentSessionId?: bigint) => Promise<SessionDTO[]>;
    /**
     * Get a specific session
     */
    readonly getSession: (userId: bigint, sessionId: bigint, currentSessionId?: bigint) => Promise<SessionDTO>;
    /**
     * Revoke a specific session
     */
    readonly revokeSession: (userId: bigint, sessionId: bigint, currentSessionId?: bigint) => Promise<void>;
    /**
     * Revoke all sessions except the current one
     */
    readonly revokeOtherSessions: (userId: bigint, currentSessionId: bigint) => Promise<number>;
    /**
     * Get active session count for a user (cached)
     */
    readonly getSessionCount: (userId: bigint) => Promise<number>;
    /**
     * Update session last activity timestamp
     */
    readonly updateActivity: (sessionId: bigint) => Promise<void>;
    /**
     * Cleanup expired sessions
     */
    readonly cleanupExpired: () => Promise<number>;
    /**
     * Invalidate all session-related caches for a user
     */
    readonly invalidateUserSessionCaches: (userId: bigint) => Promise<void>;
    /**
     * Revoke all sessions for a user
     */
    readonly revokeAllSessions: (userId: bigint, reason: string) => Promise<number>;
};
export type SessionDomainService = typeof sessionDomainService;
//# sourceMappingURL=session.service.d.ts.map