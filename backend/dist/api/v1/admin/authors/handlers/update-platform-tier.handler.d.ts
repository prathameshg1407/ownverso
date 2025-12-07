/**
 * Admin Update Platform Tier Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AdminUpdatePlatformTierRequest } from '../../../../../api/v1/author/author.schema';
export declare function updatePlatformTierHandler(request: FastifyRequest<{
    Params: {
        userId: string;
    };
    Body: AdminUpdatePlatformTierRequest;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=update-platform-tier.handler.d.ts.map