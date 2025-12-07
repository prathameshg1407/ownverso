/**
 * Logger Service
 *
 * Provides structured logging with Pino.
 */
import { Logger as PinoLogger, LoggerOptions as PinoLoggerOptions } from 'pino';
import { FastifyBaseLogger } from 'fastify';
export type Logger = PinoLogger;
export type LoggerOptions = PinoLoggerOptions;
/**
 * Create a logger instance
 */
export declare function createLogger(options?: LoggerOptions): Logger;
/**
 * Default application logger
 */
export declare const logger: Logger;
/**
 * Logger compatible with Fastify's expected type
 * Use this when passing to Fastify
 */
export declare const fastifyLogger: FastifyBaseLogger;
/**
 * Create a child logger with additional context
 */
export declare function createChildLogger(bindings: Record<string, unknown>): Logger;
//# sourceMappingURL=logger.service.d.ts.map