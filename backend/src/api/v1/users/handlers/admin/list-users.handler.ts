/**
 * Admin List Users Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { adminUserService } from '@/domain/users/services';
import { sendPaginated } from '../../utils/response.utils';
import type { AdminUserQuery } from '@/domain/users';



export async function listUsersHandler(
  request: FastifyRequest<{ Querystring: AdminUserQuery }>,
  reply: FastifyReply,
): Promise<void> {
  const { page = 1, limit = 20, createdFrom, createdTo, ...filters } = request.query;

  const query = {
    page,
    limit,
    ...filters,
    createdFrom: createdFrom ? new Date(createdFrom) : undefined,
    createdTo: createdTo ? new Date(createdTo) : undefined,
  };

  const { users, total } = await adminUserService.listUsers(query);

  sendPaginated(reply, request, users, page, limit, total);
}