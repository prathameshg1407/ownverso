/**
 * Author Service
 */
import type { RegisterAuthorInput, UpdateAuthorAccountInput, AuthorAccountDTO, AuthorDashboardDTO, AuthorStatsDTO, AuthorActivityDTO } from '../types/author.types';
export declare const authorService: {
    /**
     * Register user as author
     */
    registerAuthor(input: RegisterAuthorInput): Promise<AuthorAccountDTO>;
    /**
     * Get author account by user ID
     */
    getAccount(userId: bigint): Promise<AuthorAccountDTO>;
    /**
     * Update author account
     */
    updateAccount(userId: bigint, input: UpdateAuthorAccountInput): Promise<AuthorAccountDTO>;
    /**
     * Get author dashboard data
     */
    getDashboard(userId: bigint): Promise<AuthorDashboardDTO>;
    /**
     * Get author statistics
     */
    getStats(userId: bigint): Promise<AuthorStatsDTO>;
    /**
     * Get recent activity for dashboard
     */
    getRecentActivity(_userId: bigint, _limit?: number): Promise<AuthorActivityDTO[]>;
    /**
     * Check if user is an author
     */
    isAuthor(userId: bigint): Promise<boolean>;
    /**
     * Get author by public ID (for public profiles)
     */
    getByPublicId(publicId: string): Promise<AuthorAccountDTO>;
};
export type AuthorService = typeof authorService;
//# sourceMappingURL=author.service.d.ts.map