"use strict";
/**
 * Upload Avatar Handler
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatarHandler = uploadAvatarHandler;
const promises_1 = require("stream/promises");
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const services_1 = require("../../../../../domain/users/services");
const errors_1 = require("../../../../../common/errors");
const constants_1 = require("../../../../../common/constants");
const config_1 = require("../../../../../config");
const logger_1 = require("../../../../../core/logger");
const utils_1 = require("../../utils");
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const MIME_TO_EXT = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
};
async function saveLocalFile(fileStream, filename) {
    const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'avatars');
    await fs_1.default.promises.mkdir(uploadDir, { recursive: true });
    const filepath = path_1.default.join(uploadDir, filename);
    await (0, promises_1.pipeline)(fileStream, fs_1.default.createWriteStream(filepath));
    return `${config_1.config.app.url}/uploads/avatars/${filename}`;
}
async function uploadToProduction(filename) {
    // TODO: Implement S3/CDN upload
    // return await storageService.upload(fileStream, `avatars/${filename}`);
    return `https://cdn.ownverso.com/avatars/${filename}`;
}
async function uploadAvatarHandler(request, reply) {
    const data = await request.file();
    if (!data) {
        throw new errors_1.BadRequestError('No file uploaded', constants_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (!ALLOWED_MIME_TYPES.has(data.mimetype)) {
        throw new errors_1.BadRequestError('Invalid file type. Allowed: JPEG, PNG, GIF, WebP', constants_1.ERROR_CODES.VALIDATION_ERROR);
    }
    const userId = (0, utils_1.getUserId)(request);
    const userPublicId = (0, utils_1.getUserPublicId)(request);
    const ext = MIME_TO_EXT[data.mimetype] ?? '.jpg';
    const filename = `avatar_${userPublicId}_${(0, crypto_1.randomUUID)()}${ext}`;
    const avatarUrl = config_1.config.app.isProduction
        ? await uploadToProduction(filename)
        : await saveLocalFile(data.file, filename);
    const result = await services_1.userProfileService.updateAvatar(userId, avatarUrl);
    logger_1.logger.info({ userId: userPublicId, avatarUrl }, 'Avatar uploaded');
    (0, utils_1.sendSuccess)(reply, request, { avatarUrl: result.avatarUrl });
}
//# sourceMappingURL=upload-avatar.handler.js.map