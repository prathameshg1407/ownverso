/**
 * Application Entry Point
 *
 * This is the main entry point for the Ownverso backend application.
 * It initializes and starts the server.
 */

import 'dotenv/config';

import { startServer } from './server';
import { logger } from '@/core/logger';

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.fatal({ reason }, 'Unhandled Rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.fatal({ error }, 'Uncaught Exception');
  process.exit(1);
});

// Start the server
startServer().catch((error: unknown) => {
  logger.fatal({ error }, 'Failed to start server');
  process.exit(1);
});