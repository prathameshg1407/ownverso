/**
 * Auth Account Repository
 * Data access layer for OAuth/social accounts
 */
import type { AuthProvider, AuthAccount } from '@prisma/client';
import type { CreateAuthAccountInput } from '../types/auth.types';
export declare const authAccountRepository: {
    readonly create: (input: CreateAuthAccountInput) => Promise<AuthAccount>;
    readonly findById: (id: bigint) => Promise<AuthAccount | null>;
    readonly findByProviderAccount: (provider: AuthProvider, providerAccountId: string) => Promise<AuthAccount | null>;
    readonly findByUserId: (userId: bigint) => Promise<AuthAccount[]>;
    readonly findActiveByUserId: (userId: bigint) => Promise<AuthAccount[]>;
    readonly hasProvider: (userId: bigint, provider: AuthProvider) => Promise<boolean>;
    readonly revoke: (id: bigint, reason?: string) => Promise<void>;
    readonly countActiveProviders: (userId: bigint) => Promise<number>;
    readonly upsert: (input: CreateAuthAccountInput) => Promise<AuthAccount>;
};
export type AuthAccountRepository = typeof authAccountRepository;
//# sourceMappingURL=auth-account.repository.d.ts.map