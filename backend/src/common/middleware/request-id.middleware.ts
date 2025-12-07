/**
 * Request ID Middleware
 *
 * Ensures every request has a unique identifier for tracing.
 */

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { randomUUID } from 'crypto';

import { HEADERS } from '@/common/constants/app.constants';

const requestIdMiddlewarePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
    // Use existing request ID from header or generate new one
    const requestId =
      (request.headers[HEADERS.REQUEST_ID] as string) || randomUUID();

    // Set request ID on the request object
    request.requestId = requestId;

    // Also track the start time for request duration logging
    request.startTime = process.hrtime.bigint();

    // Add request ID to response headers
    reply.header(HEADERS.REQUEST_ID, requestId);
  });
};

export const requestIdMiddleware = fp(requestIdMiddlewarePlugin, {
  name: 'request-id-middleware',
});