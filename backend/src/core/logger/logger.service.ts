// src/core/logger.ts
/**
 * Logger Service
 *
 * Provides structured logging with Pino.
 */

import pino, { Logger as PinoLogger, LoggerOptions as PinoLoggerOptions } from 'pino';
import { FastifyBaseLogger } from 'fastify';

import { appConfig } from '@/config/app.config';

export type Logger = PinoLogger;
export type LoggerOptions = PinoLoggerOptions;

/**
 * Create a logger instance
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  const isDevelopment = appConfig.nodeEnv === 'development';
  const isTest = appConfig.nodeEnv === 'test';

  const baseOptions: LoggerOptions = {
    name: appConfig.name,
    level: isTest ? 'silent' : appConfig.logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
      bindings: (bindings) => ({
        pid: bindings.pid,
        hostname: bindings.hostname,
        name: bindings.name,
      }),
    },
    redact: {
      paths: [
        'password',
        'passwordHash',
        'accessToken',
        'refreshToken',
        'token',
        'secret',
        'apiKey',
        'authorization',
        'cookie',
        'req.headers.authorization',
        'req.headers.cookie',
      ],
      censor: '[REDACTED]',
    },
  };

  // Use pretty printing in development
  if (isDevelopment && appConfig.logFormat === 'pretty') {
    return pino({
      ...baseOptions,
      ...options,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      },
    });
  }

  return pino({
    ...baseOptions,
    ...options,
  });
}

/**
 * Default application logger
 */
export const logger = createLogger();

/**
 * Logger compatible with Fastify's expected type
 * Use this when passing to Fastify
 */
export const fastifyLogger = logger as FastifyBaseLogger;

/**
 * Create a child logger with additional context
 */
export function createChildLogger(
  bindings: Record<string, unknown>
): Logger {
  return logger.child(bindings);
}