/**
 * CORS Plugin
 *
 * Configures Cross-Origin Resource Sharing.
 */

import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import cors from '@fastify/cors';

import { config } from '@/config';

async function corsPluginImpl(fastify: FastifyInstance): Promise<void> {
  // Use type assertion to bypass the complex generic mismatch
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (fastify as any).register(cors, {
    origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) {
        callback(null, true);
        return;
      }

      // Check if origin is in allowed list
      const isAllowed = config.cors.origins.some((allowed) => {
        if (allowed === '*') return true;
        if (allowed.startsWith('*.')) {
          // Wildcard subdomain matching
          const domain = allowed.slice(2);
          return origin.endsWith(domain);
        }
        return origin === allowed;
      });

      callback(null, isAllowed);
    },
    credentials: config.cors.credentials,
    methods: config.cors.methods,
    allowedHeaders: config.cors.allowedHeaders,
    exposedHeaders: config.cors.exposedHeaders,
    maxAge: config.cors.maxAge,
    preflight: true,
    strictPreflight: true,
  });
}

export const corsPlugin = fp(corsPluginImpl, {
  name: 'cors-plugin',
});