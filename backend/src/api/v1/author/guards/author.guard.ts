// ==== FILE: src/api/v1/author/guards/author.guard.ts ====
/**
 * Author Guards
 */

import type { FastifyRequest, preHandlerHookHandler } from 'fastify';
import { ForbiddenError } from '@/common/errors/http.errors';
import { ERROR_CODES } from '@/common/constants/error-codes.constants';
import { authorService } from '@/domain/authors/services';

/**
 * Require user to be an author
 */
export const requireAuthorAccount: preHandlerHookHandler = async (
  request: FastifyRequest
): Promise<void> => {
  if (!request.user) {
    throw new ForbiddenError('Authentication required', ERROR_CODES.AUTH_REQUIRED);
  }

  const isAuthor = await authorService.isAuthor(request.user.id);
  if (!isAuthor) {
    throw new ForbiddenError(
      'Author account required. Please register as an author first.',
      ERROR_CODES.AUTHOR_NOT_FOUND
    );
  }
};