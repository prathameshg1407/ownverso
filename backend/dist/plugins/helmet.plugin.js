"use strict";
/**
 * Helmet Plugin
 *
 * Configures security headers.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helmetPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const app_config_1 = require("../config/app.config");
const helmetPluginImpl = async (fastify) => {
    await fastify.register(helmet_1.default, {
        // Content Security Policy
        contentSecurityPolicy: app_config_1.appConfig.isProduction
            ? {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],
                },
            }
            : false, // Disable in development for easier debugging
        // Cross-Origin settings
        crossOriginEmbedderPolicy: false,
        crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        // Other security headers
        dnsPrefetchControl: { allow: false },
        frameguard: { action: 'deny' },
        hidePoweredBy: true,
        hsts: app_config_1.appConfig.isProduction
            ? {
                maxAge: 31536000, // 1 year
                includeSubDomains: true,
                preload: true,
            }
            : false,
        ieNoOpen: true,
        noSniff: true,
        originAgentCluster: true,
        permittedCrossDomainPolicies: { permittedPolicies: 'none' },
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        xssFilter: true,
    });
};
exports.helmetPlugin = (0, fastify_plugin_1.default)(helmetPluginImpl, {
    name: 'helmet-plugin',
});
//# sourceMappingURL=helmet.plugin.js.map