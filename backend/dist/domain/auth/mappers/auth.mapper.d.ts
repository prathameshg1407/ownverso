/**
 * Auth Mappers
 * Transform database entities to DTOs
 */
import type { Session, AuthAccount } from '@prisma/client';
import type { SessionDTO, AuthAccountDTO } from '../types/auth.types';
export declare const sessionMapper: {
    readonly toDTO: (session: Session, currentSessionId?: bigint) => SessionDTO;
    readonly toDTOList: (sessions: Session[], currentSessionId?: bigint) => SessionDTO[];
};
export declare const authAccountMapper: {
    readonly toDTO: (account: AuthAccount) => AuthAccountDTO;
    readonly toDTOList: (accounts: AuthAccount[]) => AuthAccountDTO[];
};
//# sourceMappingURL=auth.mapper.d.ts.map