// ==== FILE: src/api/v1/admin/sites/handlers/get-site.handler.ts ====
/**
 * Admin Get Site Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { siteRepository } from '@/domain/sites/repositories';
import { adminSiteMapper } from '@/domain/sites/mappers';
import { sendSuccess } from '../../../users/utils';

export async function adminGetSiteHandler(
  request: FastifyRequest<{ Params: { siteId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;

  const site = await siteRepository.findByIdFull(siteId);
  if (!site) {
    throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
  }

  sendSuccess(reply, request, { site: adminSiteMapper.toDetailDTO(site as any) });
}