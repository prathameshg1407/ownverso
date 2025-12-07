"use strict";
/**
 * Liveness Handler
 *
 * Simple check to verify the server is running.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.livenessHandler = livenessHandler;
async function livenessHandler(_request, reply) {
    reply.send({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
}
//# sourceMappingURL=liveness.handler.js.map