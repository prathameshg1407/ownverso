/**
 * Author API Endpoints
 */

import { apiClient } from '../client';
import type {
  RegisterAuthorRequest,
  UpdateAuthorAccountRequest,
  SubscribePlatformRequest,
  ChangePlatformPlanRequest,
  AuthorAccount,
  AuthorDashboard,
  AuthorStats,
  PlatformSubscription,
  PlatformPlan,
  SuccessResponse,
} from '@/types/api';

const BASE_PATH = '/author';

// ─────────────────────────────────────────────────────────────────────────────
// Account Management
// ─────────────────────────────────────────────────────────────────────────────

async function registerAuthor(data?: RegisterAuthorRequest): Promise<AuthorAccount> {
  const response = await apiClient.post<SuccessResponse<{ account: AuthorAccount }>>(
    `${BASE_PATH}/register`,
    data ?? {}
  );
  return response.data.data.account;
}

async function getAccount(): Promise<AuthorAccount> {
  const response = await apiClient.get<SuccessResponse<{ account: AuthorAccount }>>(
    `${BASE_PATH}/account`
  );
  return response.data.data.account;
}

async function updateAccount(data: UpdateAuthorAccountRequest): Promise<AuthorAccount> {
  const response = await apiClient.put<SuccessResponse<{ account: AuthorAccount }>>(
    `${BASE_PATH}/account`,
    data
  );
  return response.data.data.account;
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard & Stats
// ─────────────────────────────────────────────────────────────────────────────

async function getDashboard(): Promise<AuthorDashboard> {
  const response = await apiClient.get<SuccessResponse<{ dashboard: AuthorDashboard }>>(
    `${BASE_PATH}/dashboard`
  );
  return response.data.data.dashboard;
}

async function getStats(): Promise<AuthorStats> {
  const response = await apiClient.get<SuccessResponse<{ stats: AuthorStats }>>(
    `${BASE_PATH}/stats`
  );
  return response.data.data.stats;
}

// ─────────────────────────────────────────────────────────────────────────────
// Platform Subscription
// ─────────────────────────────────────────────────────────────────────────────

async function getPlatformSubscription(): Promise<PlatformSubscription> {
  const response = await apiClient.get<SuccessResponse<{ subscription: PlatformSubscription }>>(
    `${BASE_PATH}/platform-subscription`
  );
  return response.data.data.subscription;
}

async function listPlatformPlans(): Promise<PlatformPlan[]> {
  const response = await apiClient.get<SuccessResponse<{ plans: PlatformPlan[] }>>(
    `${BASE_PATH}/platform-plans`
  );
  return response.data.data.plans;
}

async function subscribePlatform(data: SubscribePlatformRequest): Promise<PlatformSubscription> {
  const response = await apiClient.post<SuccessResponse<{ subscription: PlatformSubscription }>>(
    `${BASE_PATH}/platform-subscription/subscribe`,
    data
  );
  return response.data.data.subscription;
}

async function changePlatformPlan(data: ChangePlatformPlanRequest): Promise<PlatformSubscription> {
  const response = await apiClient.put<SuccessResponse<{ subscription: PlatformSubscription }>>(
    `${BASE_PATH}/platform-subscription/change`,
    data
  );
  return response.data.data.subscription;
}

async function cancelPlatformSubscription(): Promise<PlatformSubscription> {
  const response = await apiClient.post<SuccessResponse<{ subscription: PlatformSubscription }>>(
    `${BASE_PATH}/platform-subscription/cancel`,
    {}
  );
  return response.data.data.subscription;
}

async function reactivatePlatformSubscription(): Promise<PlatformSubscription> {
  const response = await apiClient.post<SuccessResponse<{ subscription: PlatformSubscription }>>(
    `${BASE_PATH}/platform-subscription/reactivate`,
    {}
  );
  return response.data.data.subscription;
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const authorApi = {
  registerAuthor,
  getAccount,
  updateAccount,
  getDashboard,
  getStats,
  getPlatformSubscription,
  listPlatformPlans,
  subscribePlatform,
  changePlatformPlan,
  cancelPlatformSubscription,
  reactivatePlatformSubscription,
} as const;