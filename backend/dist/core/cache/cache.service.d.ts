/**
 * Cache Service
 *
 * High-level caching abstraction over Redis.
 */
export interface CacheService {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    expire(key: string, ttlSeconds: number): Promise<void>;
    ttl(key: string): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    flush(): Promise<void>;
}
/**
 * Cache service implementation
 */
export declare const cacheService: CacheService;
//# sourceMappingURL=cache.service.d.ts.map