// ==== FILE: src/api/v1/admin/sites/handlers/list-sites.handler.ts ====
/**
 * Admin List Sites Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { siteRepository } from '@/domain/sites/repositories';
import { adminSiteMapper } from '@/domain/sites/mappers';
import { createPaginationMeta } from '@/common/dto/pagination.dto';
import type { AdminSiteQuery } from '@/api/v1/sites/sites.schema';

export async function adminListSitesHandler(
  request: FastifyRequest<{ Querystring: AdminSiteQuery }>,
  reply: FastifyReply
): Promise<void> {
  const { page = 1, limit = 20, authorId, ...filters } = request.query;

  const { sites, total } = await siteRepository.findMany({
    page,
    limit,
    authorId: authorId ? BigInt(authorId) : undefined,
    ...filters,
  });

  const data = sites.map((site) => adminSiteMapper.toSummaryDTO(site as any));
  const meta = createPaginationMeta(page, limit, total);

  reply.send({
    success: true,
    data,
    meta: {
      ...meta,
      hasNext: meta.hasNextPage,
      hasPrev: meta.hasPreviousPage,
    },
    timestamp: new Date().toISOString(),
    requestId: request.id,
  });
}