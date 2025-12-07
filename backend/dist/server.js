"use strict";
/**
 * Server Bootstrap
 *
 * Handles server initialization, startup, and shutdown procedures.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const app_1 = require("./app");
const config_1 = require("./config");
const logger_1 = require("./core/logger");
async function startServer() {
    const configValidation = (0, config_1.validateConfig)();
    if (!configValidation.success) {
        logger_1.logger.error({ errors: configValidation.errors }, 'Configuration validation failed');
        process.exit(1);
    }
    logger_1.logger.info({ env: config_1.config.app.nodeEnv }, 'Starting Ownverso Backend...');
    try {
        const app = await (0, app_1.buildApp)();
        // 🔍 Catch initialization plugin errors
        app.ready((err) => {
            if (err) {
                console.error('🔍 Fastify Ready Error Trace:', err);
            }
        });
        const address = await app.listen({
            host: config_1.config.app.host,
            port: config_1.config.app.port,
        });
        logger_1.logger.info({
            address,
            environment: config_1.config.app.nodeEnv,
            version: config_1.config.app.version,
        }, `🚀 Server is running at ${address}`);
        if (config_1.config.swagger.enabled) {
            logger_1.logger.info(`📚 API Documentation: ${address}${config_1.config.swagger.path}`);
        }
    }
    catch (error) {
        console.error('🔥 Server Start Error Trace:', error);
        logger_1.logger.fatal({
            message: error?.message,
            stack: error?.stack,
            name: error?.name,
        }, 'Failed to start server');
        process.exit(1); // ❌ Prevents missing stack traces
    }
}
//# sourceMappingURL=server.js.map