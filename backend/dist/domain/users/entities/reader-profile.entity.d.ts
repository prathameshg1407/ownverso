/**
 * Reader Profile Entity
 */
import type { ReaderProfile, ContentType } from '@prisma/client';
export interface ReaderProfileEntity {
    readonly userId: bigint;
    readonly preferredGenres: string[];
    readonly preferredContentTypes: ContentType[];
    readonly totalSeriesRead: number;
    readonly totalChaptersRead: number;
    readonly totalReadTimeHours: number;
    readonly totalWordsRead: bigint;
    readonly activeSubscriptions: number;
    readonly lifetimeSpent: bigint;
    readonly lifetimeCurrency: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare function toReaderProfileEntity(profile: ReaderProfile): ReaderProfileEntity;
//# sourceMappingURL=reader-profile.entity.d.ts.map