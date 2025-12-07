// ==== FILE: src/api/v1/admin/authors/handlers/list-authors.handler.ts ====
/**
 * Admin List Authors Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorAccountRepository } from '@/domain/authors/repositories';
import { adminAuthorMapper } from '@/domain/authors/mappers';
import { createPaginationMeta } from '@/common/dto/pagination.dto';
import type { AdminAuthorQuery } from '@/api/v1/author/author.schema';

export async function listAuthorsHandler(
  request: FastifyRequest<{ Querystring: AdminAuthorQuery }>,
  reply: FastifyReply
): Promise<void> {
  const { page = 1, limit = 20, ...filters } = request.query;

  const { accounts, total } = await authorAccountRepository.findMany({
    page,
    limit,
    ...filters,
  });

  const data = accounts.map((account) => adminAuthorMapper.toSummaryDTO(account));
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