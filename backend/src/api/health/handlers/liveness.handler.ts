/**
 * Liveness Handler
 *
 * Simple check to verify the server is running.
 */

import { FastifyRequest, FastifyReply } from 'fastify';

export async function livenessHandler(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  reply.send({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}