"use strict";
// src/config/database.config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
exports.validateDatabaseConfig = validateDatabaseConfig;
exports.databaseConfig = {
    url: process.env.DATABASE_URL || '',
    logQueries: process.env.LOG_DB_QUERIES === 'true',
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000', 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '60000', 10),
};
// Validate configuration
function validateDatabaseConfig() {
    if (!exports.databaseConfig.url) {
        throw new Error('DATABASE_URL environment variable is required');
    }
    if (exports.databaseConfig.poolSize < 1 || exports.databaseConfig.poolSize > 100) {
        throw new Error('DB_POOL_SIZE must be between 1 and 100');
    }
}
//# sourceMappingURL=database.config.js.map