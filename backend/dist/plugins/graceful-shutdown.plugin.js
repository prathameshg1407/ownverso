"use strict";
/**
 * Graceful Shutdown Plugin
 *
 * Handles graceful server shutdown.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gracefulShutdownPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const logger_1 = require("../core/logger");
const gracefulShutdownPluginImpl = async (fastify) => {
    const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    let isShuttingDown = false;
    const shutdown = async (signal) => {
        if (isShuttingDown) {
            logger_1.logger.warn('Shutdown already in progress, ignoring signal');
            return;
        }
        isShuttingDown = true;
        logger_1.logger.info({ signal }, 'Received shutdown signal, starting graceful shutdown...');
        const shutdownTimeout = setTimeout(() => {
            logger_1.logger.error('Graceful shutdown timed out, forcing exit');
            process.exit(1);
        }, 30000); // 30 second timeout
        try {
            // Close the server (stops accepting new connections)
            await fastify.close();
            logger_1.logger.info('Server closed successfully');
            clearTimeout(shutdownTimeout);
            process.exit(0);
        }
        catch (error) {
            logger_1.logger.error({ error }, 'Error during shutdown');
            clearTimeout(shutdownTimeout);
            process.exit(1);
        }
    };
    // Register signal handlers
    for (const signal of signals) {
        process.on(signal, () => {
            shutdown(signal).catch((error) => {
                logger_1.logger.error({ error }, 'Shutdown handler error');
                process.exit(1);
            });
        });
    }
    // Handle uncaught exceptions during request handling
    process.on('uncaughtException', (error) => {
        logger_1.logger.fatal({ error }, 'Uncaught exception');
        shutdown('uncaughtException').catch(() => process.exit(1));
    });
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
        logger_1.logger.fatal({ reason }, 'Unhandled rejection');
        shutdown('unhandledRejection').catch(() => process.exit(1));
    });
};
exports.gracefulShutdownPlugin = (0, fastify_plugin_1.default)(gracefulShutdownPluginImpl, {
    name: 'graceful-shutdown-plugin',
});
//# sourceMappingURL=graceful-shutdown.plugin.js.map