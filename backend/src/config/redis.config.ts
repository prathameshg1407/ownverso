/**
 * Redis Configuration
 */

export const redisConfig = {
  /**
   * Redis connection URL
   */
  url: process.env.REDIS_URL || 'redis://localhost:6379',

  /**
   * Redis host (fallback if URL not provided)
   */
  host: process.env.REDIS_HOST || 'localhost',

  /**
   * Redis port
   */
  port: parseInt(process.env.REDIS_PORT || '6379', 10),

  /**
   * Redis password
   */
  password: process.env.REDIS_PASSWORD || undefined,

  /**
   * Redis database number
   */
  db: parseInt(process.env.REDIS_DB || '0', 10),

  /**
   * Key prefix for namespacing
   */
  keyPrefix: process.env.REDIS_KEY_PREFIX || 'ownverso:',

  /**
   * Enable ready check
   */
  enableReadyCheck: true,

  /**
   * Maximum retries per request
   */
  maxRetriesPerRequest: 3,

  /**
   * Lazy connect (connect on first command)
   */
  lazyConnect: false,
} as const;

export type RedisConfig = typeof redisConfig;