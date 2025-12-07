/**
 * Compression Plugin
 *
 * Enables response compression.
 */

import compress from '@fastify/compress';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const compressPluginImpl: FastifyPluginAsync = async (fastify) => {
  await fastify.register(compress, {
    // Global compression
    global: true,

    // Compression threshold (don&apos;t compress small responses)
    threshold: 1024, // 1KB

    // Encoding preference
    encodings: ['gzip', 'deflate'],

    // Skip compression for certain content types
    removeContentLengthHeader: true,

    // Custom should compress
    customTypes: /^text\/|\+json$|\+text$|\+xml$/,
  });
};

export const compressPlugin = fp(compressPluginImpl, {
  name: 'compress-plugin',
});