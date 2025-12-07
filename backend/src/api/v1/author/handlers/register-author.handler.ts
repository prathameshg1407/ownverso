// ==== FILE: src/api/v1/author/handlers/register-author.handler.ts ====
/**
 * Register Author Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { authorService } from '@/domain/authors/services';
import { sendSuccess, getUserId } from '../../users/utils';
import type { RegisterAuthorRequest } from '../author.schema';

export async function registerAuthorHandler(
  request: FastifyRequest<{ Body: RegisterAuthorRequest }>,
  reply: FastifyReply
): Promise<void> {
  const userId = getUserId(request);

  const account = await authorService.registerAuthor({
    userId,
    ...request.body,
  });

  sendSuccess(reply, request, { account }, 201);
}