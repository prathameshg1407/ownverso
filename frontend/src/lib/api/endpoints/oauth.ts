/**
 * OAuth API Endpoints
 */

import { apiClient } from '../client';
import { API_ROUTES } from '@/lib/constants/routes';
import type {
  AuthProvider,
  OAuthProviderInfo,
  OAuthProvidersResponse,
  OAuthInitResponse,
  OAuthAccount,
  LinkedAccountsResponse,
  SuccessResponse,
} from '@/types/api';

const { oauth } = API_ROUTES.auth;

export async function getProviders(): Promise<OAuthProviderInfo[]> {
  const response = await apiClient.get<OAuthProvidersResponse>(oauth.providers);
  return response.data.data.providers;
}

export async function initOAuth(
  provider: AuthProvider
): Promise<{ authUrl: string; state: string }> {
  const response = await apiClient.get<OAuthInitResponse>(oauth.init(provider.toLowerCase()));
  return response.data.data;
}

export async function linkAccount(provider: AuthProvider, code: string): Promise<OAuthAccount> {
  const response = await apiClient.post<SuccessResponse<{ account: OAuthAccount }>>(
    oauth.link(provider.toLowerCase()),
    { code }
  );
  return response.data.data.account;
}

export async function unlinkAccount(provider: AuthProvider): Promise<void> {
  await apiClient.delete(oauth.unlink(provider.toLowerCase()));
}

export async function getLinkedAccounts(): Promise<OAuthAccount[]> {
  const response = await apiClient.get<LinkedAccountsResponse>(oauth.accounts);
  return response.data.data.accounts;
}

export const oauthApi = {
  getProviders,
  initOAuth,
  linkAccount,
  unlinkAccount,
  getLinkedAccounts,
} as const;