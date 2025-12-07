/**
 * User Mappers
 */
import type { User, UserProfile, UserPreferences, UserSecurity, ReaderProfile, AuthorAccount, Session } from '@prisma/client';
import type { UserDTO, UserProfileDTO, UserPreferencesDTO, UserSecurityDTO, ReaderProfileDTO, AuthorAccountDTO, FullUserDTO, PublicUserDTO, AdminUserSummaryDTO, AdminUserDetailDTO, LoginHistoryDTO, JwtUserPayload, StatusHistoryEntry, UserWithRelations } from '../types/user.types';
export declare const userMapper: {
    toDTO(user: User): UserDTO;
    toJwtPayload(user: User, sessionId?: string): JwtUserPayload;
};
export declare const profileMapper: {
    toDTO(profile: UserProfile): UserProfileDTO;
};
export declare const preferencesMapper: {
    toDTO(prefs: UserPreferences): UserPreferencesDTO;
};
export declare const securityMapper: {
    toDTO(security: UserSecurity): UserSecurityDTO;
    parseStatusHistory(json: unknown): StatusHistoryEntry[];
};
export declare const readerProfileMapper: {
    toDTO(profile: ReaderProfile): ReaderProfileDTO;
};
export declare const authorAccountMapper: {
    toDTO(account: AuthorAccount): AuthorAccountDTO;
};
export declare const sessionMapper: {
    toLoginHistoryDTO(session: Session, currentSessionId?: string): LoginHistoryDTO;
};
export declare const fullUserMapper: {
    toDTO(user: UserWithRelations): FullUserDTO;
};
export declare const publicUserMapper: {
    toDTO(user: User & {
        profile?: UserProfile | null;
        preferences?: UserPreferences | null;
        authorAccount?: AuthorAccount | null;
        _count?: {
            series: number;
            followers: number;
        };
    }): PublicUserDTO;
};
export declare const adminUserMapper: {
    toSummaryDTO(user: User & {
        security?: {
            mfaEnabled: boolean;
            lastLoginAt: Date | null;
        } | null;
        authorAccount?: {
            userId: bigint;
        } | null;
    }): AdminUserSummaryDTO;
    toDetailDTO(user: UserWithRelations & {
        security?: UserSecurity | null;
        _count?: {
            sessions: number;
        };
    }): AdminUserDetailDTO;
};
//# sourceMappingURL=user.mapper.d.ts.map