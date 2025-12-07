// ==== FILE: src/api/v1/auth/guards/auth.guard.ts ====
/**
 * Authentication Guards
 */

import type { preHandlerHookHandler } from 'fastify';

export const requireAuth: preHandlerHookHandler = async (request, reply) => {
  await request.server.authenticate(request, reply);
};

export const optionalAuth: preHandlerHookHandler = async (request, reply) => {
  await request.server.authenticateOptional(request, reply);
};