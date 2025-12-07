/**
 * Security Middleware
 *
 * Additional security measures for requests.
 */

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const securityMiddlewarePlugin: FastifyPluginAsync = async (fastify) => {
  // Remove sensitive headers from requests
  fastify.addHook('onRequest', async (request) => {
    // Remove any server-side-only headers that might have leaked
    delete request.headers['x-powered-by'];
  });

  // Add security headers to responses
  fastify.addHook('onSend', async (_request, reply, payload) => {
    // Prevent MIME type sniffing
    reply.header('X-Content-Type-Options', 'nosniff');

    // Prevent clickjacking
    reply.header('X-Frame-Options', 'DENY');

    // Enable XSS filter
    reply.header('X-XSS-Protection', '1; mode=block');

    // Control referrer information
    reply.header('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Remove server identification
    reply.removeHeader('X-Powered-By');

    return payload;
  });
};

export const securityMiddleware = fp(securityMiddlewarePlugin, {
  name: 'security-middleware',
});