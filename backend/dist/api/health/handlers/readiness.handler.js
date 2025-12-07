"use strict";
/**
 * Readiness Handler
 *
 * Comprehensive check of all dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readinessHandler = readinessHandler;
const app_config_1 = require("../../../config/app.config");
const logger_1 = require("../../../core/logger");
const startTime = Date.now();
async function readinessHandler(request, reply) {
    const checks = {};
    let overallStatus = 'healthy';
    // Check database
    try {
        const dbStart = Date.now();
        await request.server.prisma.$queryRaw `SELECT 1`;
        checks['database'] = {
            status: 'up',
            latency: Date.now() - dbStart,
        };
    }
    catch (error) {
        logger_1.logger.error({ error }, 'Database health check failed');
        checks['database'] = {
            status: 'down',
            message: 'Database connection failed',
        };
        overallStatus = 'unhealthy';
    }
    // Check Redis
    try {
        const redisStart = Date.now();
        await request.server.redis.ping();
        checks['redis'] = {
            status: 'up',
            latency: Date.now() - redisStart,
        };
    }
    catch (error) {
        logger_1.logger.error({ error }, 'Redis health check failed');
        checks['redis'] = {
            status: 'down',
            message: 'Redis connection failed',
        };
        // Redis down is degraded, not unhealthy (caching is not critical)
        if (overallStatus === 'healthy') {
            overallStatus = 'degraded';
        }
    }
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    const heapUsedPercent = Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100);
    checks['memory'] = {
        status: heapUsedPercent < 90 ? 'up' : 'down',
        message: `${heapUsedMB}MB / ${heapTotalMB}MB (${heapUsedPercent}%)`,
    };
    if (heapUsedPercent >= 90) {
        logger_1.logger.warn({ heapUsedPercent }, 'High memory usage detected');
        if (overallStatus === 'healthy') {
            overallStatus = 'degraded';
        }
    }
    const response = {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        version: app_config_1.appConfig.version,
        uptime: Math.floor((Date.now() - startTime) / 1000),
        checks,
    };
    const statusCode = overallStatus === 'unhealthy' ? 503 : 200;
    reply.status(statusCode).send(response);
}
//# sourceMappingURL=readiness.handler.js.map