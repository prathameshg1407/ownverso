/**
 * Redis Configuration
 */
export declare const redisConfig: {
    /**
     * Redis connection URL
     */
    readonly url: string;
    /**
     * Redis host (fallback if URL not provided)
     */
    readonly host: string;
    /**
     * Redis port
     */
    readonly port: number;
    /**
     * Redis password
     */
    readonly password: string | undefined;
    /**
     * Redis database number
     */
    readonly db: number;
    /**
     * Key prefix for namespacing
     */
    readonly keyPrefix: string;
    /**
     * Enable ready check
     */
    readonly enableReadyCheck: true;
    /**
     * Maximum retries per request
     */
    readonly maxRetriesPerRequest: 3;
    /**
     * Lazy connect (connect on first command)
     */
    readonly lazyConnect: false;
};
export type RedisConfig = typeof redisConfig;
//# sourceMappingURL=redis.config.d.ts.map