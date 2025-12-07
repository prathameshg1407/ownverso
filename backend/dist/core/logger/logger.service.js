"use strict";
// src/core/logger.ts
/**
 * Logger Service
 *
 * Provides structured logging with Pino.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyLogger = exports.logger = void 0;
exports.createLogger = createLogger;
exports.createChildLogger = createChildLogger;
const pino_1 = __importDefault(require("pino"));
const app_config_1 = require("../../config/app.config");
/**
 * Create a logger instance
 */
function createLogger(options = {}) {
    const isDevelopment = app_config_1.appConfig.nodeEnv === 'development';
    const isTest = app_config_1.appConfig.nodeEnv === 'test';
    const baseOptions = {
        name: app_config_1.appConfig.name,
        level: isTest ? 'silent' : app_config_1.appConfig.logLevel,
        timestamp: pino_1.default.stdTimeFunctions.isoTime,
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
    if (isDevelopment && app_config_1.appConfig.logFormat === 'pretty') {
        return (0, pino_1.default)({
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
    return (0, pino_1.default)({
        ...baseOptions,
        ...options,
    });
}
/**
 * Default application logger
 */
exports.logger = createLogger();
/**
 * Logger compatible with Fastify's expected type
 * Use this when passing to Fastify
 */
exports.fastifyLogger = exports.logger;
/**
 * Create a child logger with additional context
 */
function createChildLogger(bindings) {
    return exports.logger.child(bindings);
}
//# sourceMappingURL=logger.service.js.map