"use strict";
/**
 * Prisma Plugin
 *
 * Provides Prisma client as a Fastify decorator.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const database_1 = require("../core/database");
const logger_1 = require("../core/logger");
async function prismaPluginImpl(fastify) {
    // Connect to database
    try {
        await (0, database_1.connectPrisma)();
        logger_1.logger.info('Database connected');
    }
    catch (error) {
        logger_1.logger.error({ error }, 'Failed to connect to database');
        throw error;
    }
    // Decorate fastify with prisma client
    fastify.decorate('prisma', database_1.prisma);
    // Disconnect on close
    fastify.addHook('onClose', async () => {
        await (0, database_1.disconnectPrisma)();
        logger_1.logger.info('Database disconnected');
    });
}
exports.prismaPlugin = (0, fastify_plugin_1.default)(prismaPluginImpl, {
    name: 'prisma-plugin',
});
//# sourceMappingURL=prisma.plugin.js.map