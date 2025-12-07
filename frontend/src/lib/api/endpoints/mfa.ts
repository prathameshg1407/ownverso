/**
 * MFA API Endpoints
 */

import { apiClient } from '../client';
import { API_ROUTES } from '@/lib/constants/routes';
import type {
  MfaSetupResponse,
  MfaSetupData,
  MfaStatusResponse,
  MfaStatusData,
  MfaBackupCodesResponse,
  MfaDisableRequest,
  SuccessResponse,
  MessageData,
} from '@/types/api';

const { mfa } = API_ROUTES.auth;

export async function setupMfa(): Promise<MfaSetupData> {
  const response = await apiClient.post<MfaSetupResponse>(mfa.setup);
  return response.data.data;
}

export async function verifyMfaSetup(code: string): Promise<{ backupCodes: string[] }> {
  const response = await apiClient.post<MfaBackupCodesResponse>(mfa.setupVerify, { code });
  return response.data.data;
}

export async function getMfaStatus(): Promise<MfaStatusData> {
  const response = await apiClient.get<MfaStatusResponse>(mfa.status);
  return response.data.data;
}

export async function disableMfa(data: MfaDisableRequest): Promise<void> {
  await apiClient.post<SuccessResponse<MessageData>>(mfa.disable, data);
}

export async function regenerateBackupCodes(password: string): Promise<{ backupCodes: string[] }> {
  const response = await apiClient.post<MfaBackupCodesResponse>(mfa.regenerateCodes, {
    password,
  });
  return response.data.data;
}

export const mfaApi = {
  setupMfa,
  verifyMfaSetup,
  getMfaStatus,
  disableMfa,
  regenerateBackupCodes,
} as const;