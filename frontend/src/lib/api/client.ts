/**
 * API Client (Cookie-based Authentication)
 */

import axios, { type AxiosInstance, type AxiosError, type AxiosHeaders } from 'axios';
import { API_CONFIG } from '@/lib/constants/config';
import type { ErrorResponse } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// ApiError
// ─────────────────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, unknown>,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(data: ErrorResponse): ApiError {
    return new ApiError(
      data.error.code,
      data.error.statusCode,
      data.error.message,
      data.error.details,
      data.requestId
    );
  }

  static networkError(): ApiError {
    return new ApiError('NETWORK_ERROR', 0, 'Unable to reach the server');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Client Instance
// ─────────────────────────────────────────────────────────────────────────────

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.endpoint,
  timeout: API_CONFIG.timeout,
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const headers = config.headers as AxiosHeaders;
  headers.set('X-Request-ID', crypto.randomUUID?.() ?? `rid-${Date.now()}-${Math.random()}`);
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      return Promise.reject(
        error.message === 'Network Error' ? ApiError.networkError() : error
      );
    }

    const data = error.response.data;
    if (data?.error) {
      return Promise.reject(ApiError.fromResponse(data));
    }

    return Promise.reject(error);
  }
);

export default apiClient;