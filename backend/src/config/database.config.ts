// src/config/database.config.ts

export interface DatabaseConfig {
  url: string;
  logQueries: boolean;
  poolSize: number;
  connectionTimeout: number;
  idleTimeout: number;
}

export const databaseConfig: DatabaseConfig = {
  url: process.env.DATABASE_URL || '',
  logQueries: process.env.LOG_DB_QUERIES === 'true',
  poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
  idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '60000', 10),
};

// Validate configuration
export function validateDatabaseConfig(): void {
  if (!databaseConfig.url) {
    throw new Error('DATABASE_URL environment variable is required');
  }
  
  if (databaseConfig.poolSize < 1 || databaseConfig.poolSize > 100) {
    throw new Error('DB_POOL_SIZE must be between 1 and 100');
  }
}