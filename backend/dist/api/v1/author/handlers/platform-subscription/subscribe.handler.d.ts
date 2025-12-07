/**
 * Subscribe to Platform Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { SubscribePlatformRequest } from '../../author.schema';
export declare function subscribeHandler(request: FastifyRequest<{
    Body: SubscribePlatformRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=subscribe.handler.d.ts.map