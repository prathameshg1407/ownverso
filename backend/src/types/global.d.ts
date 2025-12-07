/**
 * Global Type Declarations
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'staging' | 'production';
      APP_NAME: string;
      APP_VERSION: string;
      APP_PORT: string;
      APP_HOST: string;
      APP_URL: string;
      APP_FRONTEND_URL: string;
      LOG_LEVEL: string;
      LOG_FORMAT: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXPIRES_IN: string;
      JWT_REFRESH_EXPIRES_IN: string;
    }
  }

  /**
   * BigInt serialization for JSON
   */
  interface BigInt {
    toJSON(): string;
  }
}

// BigInt JSON serialization
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export {};