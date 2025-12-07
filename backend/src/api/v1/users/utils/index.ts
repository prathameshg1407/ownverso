/**
 * User Utils Index
 */

export {
  getAuthenticatedUser,
  getUserId,
  getUserPublicId,
  getOptionalUserId,
  getSessionId,
  extractAccessToken,
  getClientType,
} from './request.utils';

export {
  sendSuccess,
  sendMessage,
  sendPaginated,
  sendNoContent,
  type SuccessResponse,
  type PaginatedResponse,
  type PaginationMeta,
} from './response.utils';