"use strict";
/**
 * CORS Plugin
 *
 * Configures Cross-Origin Resource Sharing.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const cors_1 = __importDefault(require("@fastify/cors"));
const config_1 = require("../config");
async function corsPluginImpl(fastify) {
    // Use type assertion to bypass the complex generic mismatch
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await fastify.register(cors_1.default, {
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, etc.)
            if (!origin) {
                callback(null, true);
                return;
            }
            // Check if origin is in allowed list
            const isAllowed = config_1.config.cors.origins.some((allowed) => {
                if (allowed === '*')
                    return true;
                if (allowed.startsWith('*.')) {
                    // Wildcard subdomain matching
                    const domain = allowed.slice(2);
                    return origin.endsWith(domain);
                }
                return origin === allowed;
            });
            callback(null, isAllowed);
        },
        credentials: config_1.config.cors.credentials,
        methods: config_1.config.cors.methods,
        allowedHeaders: config_1.config.cors.allowedHeaders,
        exposedHeaders: config_1.config.cors.exposedHeaders,
        maxAge: config_1.config.cors.maxAge,
        preflight: true,
        strictPreflight: true,
    });
}
exports.corsPlugin = (0, fastify_plugin_1.default)(corsPluginImpl, {
    name: 'cors-plugin',
});
//# sourceMappingURL=cors.plugin.js.map