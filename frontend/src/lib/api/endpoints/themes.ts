/**
 * Themes API Endpoints
 */

import { apiClient } from '../client';
import type { Theme, ThemeSummary, SuccessResponse } from '@/types/api';

async function listThemes(): Promise<ThemeSummary[]> {
  const response = await apiClient.get<SuccessResponse<{ themes: ThemeSummary[] }>>('/themes');
  return response.data.data.themes;
}

async function getTheme(themeId: string): Promise<Theme> {
  const response = await apiClient.get<SuccessResponse<{ theme: Theme }>>(`/themes/${themeId}`);
  return response.data.data.theme;
}

export const themesApi = {
  listThemes,
  getTheme,
} as const;