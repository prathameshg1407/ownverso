// ==== FILE: src/api/v1/admin/sites/handlers/update-site-status.handler.ts ====
/**
 * Admin Update Site Status Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { NotFoundError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { siteRepository } from '@/domain/sites/repositories';
import { siteMapper } from '@/domain/sites/mappers';
import { sendSuccess } from '../../../users/utils';
import { logger } from '@/core/logger';
import type { AdminUpdateSiteStatusRequest } from '@/api/v1/sites/sites.schema';

export async function updateSiteStatusHandler(
  request: FastifyRequest<{
    Params: { siteId: string };
    Body: AdminUpdateSiteStatusRequest;
  }>,
  reply: FastifyReply
): Promise<void> {
  const { siteId } = request.params;
  const { status, reason } = request.body;

  const site = await siteRepository.findById(siteId);
  if (!site) {
    throw new NotFoundError('Site not found', ERROR_CODES.SITE_NOT_FOUND);
  }

  const updated = await siteRepository.updateStatus(siteId, status, reason);

  logger.info(
    {
      adminId: request.user?.publicId,
      siteId,
      fromStatus: site.status,
      toStatus: status,
      reason,
    },
    'Site status updated by admin'
  );

  sendSuccess(reply, request, {
    site: siteMapper.toDTO(updated),
    message: `Site status updated to ${status}`,
  });
}