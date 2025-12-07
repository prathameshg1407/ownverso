/**
 * Application Configuration
 */

export const appConfig = {
  /**
   * Application name
   */
  name: process.env.APP_NAME || 'ownverso',

  /**
   * Application version
   */
  version: process.env.APP_VERSION || '1.0.0',

  /**
   * Node environment
   */
  nodeEnv: (process.env.NODE_ENV || 'development') as
    | 'development'
    | 'test'
    | 'staging'
    | 'production',

  /**
   * Server port
   */
  port: parseInt(process.env.APP_PORT || '3001', 10),

  /**
   * Server host
   */
  host: process.env.APP_HOST || '0.0.0.0',

  /**
   * Application URL (for generating links)
   */
  url: process.env.APP_URL || 'http://localhost:3001',

  /**
   * Frontend URL (for CORS and redirects)
   */
  frontendUrl: process.env.APP_FRONTEND_URL || 'http://localhost:3000',

  /**
   * Is development environment
   */
  isDevelopment: process.env.NODE_ENV === 'development',

  /**
   * Is production environment
   */
  isProduction: process.env.NODE_ENV === 'production',

  /**
   * Is test environment
   */
  isTest: process.env.NODE_ENV === 'test',

  /**
   * Log level
   */
  logLevel: process.env.LOG_LEVEL || 'info',

  /**
   * Log format
   */
  logFormat: (process.env.LOG_FORMAT || 'json') as 'json' | 'pretty',
} as const;

export type AppConfig = typeof appConfig;