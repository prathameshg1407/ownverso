/**
 * Get Theme Handler
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ThemeIdParam } from '../../sites/sites.schema';
export declare function getThemeHandler(request: FastifyRequest<{
    Params: ThemeIdParam;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=get-theme.handler.d.ts.map