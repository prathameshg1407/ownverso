"use strict";
/**
 * Application Entry Point
 *
 * This is the main entry point for the Ownverso backend application.
 * It initializes and starts the server.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./server");
const logger_1 = require("./core/logger");
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    logger_1.logger.fatal({ reason }, 'Unhandled Rejection');
    process.exit(1);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger_1.logger.fatal({ error }, 'Uncaught Exception');
    process.exit(1);
});
// Start the server
(0, server_1.startServer)().catch((error) => {
    logger_1.logger.fatal({ error }, 'Failed to start server');
    process.exit(1);
});
//# sourceMappingURL=index.js.map