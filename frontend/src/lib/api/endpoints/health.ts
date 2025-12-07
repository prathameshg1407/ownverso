/**
 * Health Check API Endpoints
 */

import { apiClient } from '../client';
import type { HealthCheckResponse } from '@/types/api';

const HEALTH_BASE = '/health';

async function checkLiveness(): Promise<{ status: string; timestamp: string }> {
  const response = await apiClient.get<{ status: string; timestamp: string }>(
    `${HEALTH_BASE}/live`
  );
  return response.data;
}

async function checkReadiness(): Promise<HealthCheckResponse> {
  const response = await apiClient.get<HealthCheckResponse>(`${HEALTH_BASE}/ready`);
  return response.data;
}

async function checkHealth(): Promise<{ status: string; timestamp: string }> {
  const response = await apiClient.get<{ status: string; timestamp: string }>(HEALTH_BASE);
  return response.data;
}

export const healthApi = {
  checkLiveness,
  checkReadiness,
  checkHealth,
} as const;