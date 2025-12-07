/**
 * Upload Avatar Handler
 */

import type { FastifyRequest, FastifyReply } from 'fastify';
import { pipeline } from 'stream/promises';
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs';

import { userProfileService } from '@/domain/users/services';
import { BadRequestError } from '@/common/errors';
import { ERROR_CODES } from '@/common/constants';
import { config } from '@/config';
import { logger } from '@/core/logger';
import { sendSuccess, getUserId, getUserPublicId } from '../../utils';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

const MIME_TO_EXT: Readonly<Record<string, string>> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

async function saveLocalFile(
  fileStream: NodeJS.ReadableStream,
  filename: string,
): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  await pipeline(fileStream, fs.createWriteStream(filepath));

  return `${config.app.url}/uploads/avatars/${filename}`;
}

async function uploadToProduction(filename: string): Promise<string> {
  // TODO: Implement S3/CDN upload
  // return await storageService.upload(fileStream, `avatars/${filename}`);
  return `https://cdn.ownverso.com/avatars/${filename}`;
}

export async function uploadAvatarHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const data = await request.file();

  if (!data) {
    throw new BadRequestError('No file uploaded', ERROR_CODES.VALIDATION_ERROR);
  }

  if (!ALLOWED_MIME_TYPES.has(data.mimetype)) {
    throw new BadRequestError(
      'Invalid file type. Allowed: JPEG, PNG, GIF, WebP',
      ERROR_CODES.VALIDATION_ERROR,
    );
  }

  const userId = getUserId(request);
  const userPublicId = getUserPublicId(request);
  const ext = MIME_TO_EXT[data.mimetype] ?? '.jpg';
  const filename = `avatar_${userPublicId}_${randomUUID()}${ext}`;

  const avatarUrl = config.app.isProduction
    ? await uploadToProduction(filename)
    : await saveLocalFile(data.file, filename);

  const result = await userProfileService.updateAvatar(userId, avatarUrl);

  logger.info({ userId: userPublicId, avatarUrl }, 'Avatar uploaded');

  sendSuccess(reply, request, { avatarUrl: result.avatarUrl });
}