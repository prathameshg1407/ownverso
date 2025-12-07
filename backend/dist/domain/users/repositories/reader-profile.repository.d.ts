/**
 * Reader Profile Repository
 */
import type { ReaderProfile } from '@prisma/client';
interface IncrementStats {
    chaptersRead?: number;
    readTimeHours?: number;
    wordsRead?: bigint;
}
export declare const readerProfileRepository: {
    findByUserId(userId: bigint): Promise<ReaderProfile | null>;
    ensureExists(userId: bigint): Promise<ReaderProfile>;
    incrementStats(userId: bigint, stats: IncrementStats): Promise<void>;
};
export type ReaderProfileRepository = typeof readerProfileRepository;
export {};
//# sourceMappingURL=reader-profile.repository.d.ts.map