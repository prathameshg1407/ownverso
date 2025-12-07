/**
 * Readiness Handler
 *
 * Comprehensive check of all dependencies.
 */

import { FastifyRequest, FastifyReply } from 'fastify';

import { appConfig } from '@/config/app.config';
import { logger } from '@/core/logger';

interface HealthCheck {
  status: 'up' | 'down';
  latency?: number;
  message?: string;
}

interface ReadinessResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: Record<string, HealthCheck>;
}

const startTime = Date.now();

export async function readinessHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const checks: Record<string, HealthCheck> = {};
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  // Check database
  try {
    const dbStart = Date.now();
    await request.server.prisma.$queryRaw`SELECT 1`;
    checks['database'] = {
      status: 'up',
      latency: Date.now() - dbStart,
    };
  } catch (error) {
    logger.error({ error }, 'Database health check failed');
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
  } catch (error) {
    logger.error({ error }, 'Redis health check failed');
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
    logger.warn({ heapUsedPercent }, 'High memory usage detected');
    if (overallStatus === 'healthy') {
      overallStatus = 'degraded';
    }
  }

  const response: ReadinessResponse = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: appConfig.version,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    checks,
  };

  const statusCode = overallStatus === 'unhealthy' ? 503 : 200;
  reply.status(statusCode).send(response);
}