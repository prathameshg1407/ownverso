// ==== FILE: src/api/v1/auth/utils/index.ts ====
/**
 * Auth Utils Index
 */

export {
  getAuthenticatedUser,
  getUserId,
  getUserPublicId,
  getDeviceInfo,
  extractRefreshToken,
  extractAccessToken,
  getCurrentSessionId,
  getClientType,
  type ClientType,
} from './request.utils';

export {
  sendSuccess,
  sendMessage,
  sendNoContent,
  sendAuthResponse,
  sendMfaPendingResponse,
  sendTokensResponse,
  type AuthResponseData,
  type MfaPendingData,
} from './response.utils';

export { generateOAuthState, verifyOAuthState, maskEmail } from './oauth.utils';