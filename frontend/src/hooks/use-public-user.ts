/**
 * Public User Profile Hooks
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { usersApi } from '@/lib/api/endpoints';
import { QUERY_KEYS, CACHE_TIMES } from '@/lib/constants';

export function usePublicUser(username: string) {
  return useQuery({
    queryKey: QUERY_KEYS.users.public(username),
    queryFn: () => usersApi.getPublicUserByUsername(username),
    enabled: Boolean(username),
    staleTime: CACHE_TIMES.publicUser,
  });
}

export function usePublicUserById(publicId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.users.publicById(publicId),
    queryFn: () => usersApi.getPublicUserById(publicId),
    enabled: Boolean(publicId),
    staleTime: CACHE_TIMES.publicUser,
  });
}