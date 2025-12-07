"use strict";
/**
 * Compression Plugin
 *
 * Enables response compression.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const compress_1 = __importDefault(require("@fastify/compress"));
const compressPluginImpl = async (fastify) => {
    await fastify.register(compress_1.default, {
        // Global compression
        global: true,
        // Compression threshold (don't compress small responses)
        threshold: 1024, // 1KB
        // Encoding preference
        encodings: ['gzip', 'deflate'],
        // Skip compression for certain content types
        removeContentLengthHeader: true,
        // Custom should compress
        customTypes: /^text\/|\+json$|\+text$|\+xml$/,
    });
};
exports.compressPlugin = (0, fastify_plugin_1.default)(compressPluginImpl, {
    name: 'compress-plugin',
});
//# sourceMappingURL=compress.plugin.js.map