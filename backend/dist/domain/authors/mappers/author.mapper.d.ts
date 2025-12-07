/**
 * Author Mappers
 */
import type { AuthorAccount } from '@prisma/client';
import type { AuthorAccountDTO, PlatformSubscriptionDTO, AdminAuthorSummaryDTO, AdminAuthorDetailDTO, AuthorAccountWithUser } from '../types/author.types';
export declare const authorAccountMapper: {
    toDTO(account: AuthorAccount): AuthorAccountDTO;
    toPlatformSubscriptionDTO(account: AuthorAccount): PlatformSubscriptionDTO;
};
export declare const adminAuthorMapper: {
    toSummaryDTO(account: AuthorAccount & {
        user: {
            publicId: string;
            email: string;
            username: string;
        };
    }): AdminAuthorSummaryDTO;
    toDetailDTO(account: AuthorAccountWithUser): AdminAuthorDetailDTO;
};
//# sourceMappingURL=author.mapper.d.ts.map