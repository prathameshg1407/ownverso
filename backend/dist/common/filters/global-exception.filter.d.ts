/**
 * Global Exception Filter
 *
 * Handles all uncaught errors and formats consistent error responses.
 */
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
/**
 * Global exception handler for Fastify
 */
export declare function globalExceptionFilter(this: FastifyInstance, error: Error, request: FastifyRequest, reply: FastifyReply): void;
//# sourceMappingURL=global-exception.filter.d.ts.map