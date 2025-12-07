// src/core/logger/index.ts
/**
 * Logger Module Exports
 */

export { 
  logger, 
  fastifyLogger,
  createLogger, 
  createChildLogger 
} from './logger.service';

export type { Logger, LoggerOptions } from './logger.service';