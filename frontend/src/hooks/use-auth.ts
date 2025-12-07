/**
 * Authentication Hook
 */

'use client';

import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { authApi } from '@/lib/api/endpoints';
import { useAuthStore } from '@/lib/stores/auth.store';
import { QUERY_KEYS } from '@/lib/constants/keys';
import { AUTH_ROUTES, READER_ROUTES } from '@/lib/constants/routes';
import { formatError } from '@/lib/api/error-handler';
import type { LoginRequest, RegisterRequest, ForgotPasswordRequest, AuthUser } from '@/types/api';

function normalizeAuthUser(user: AuthUser | null): AuthUser | null {
  if (!user) return null;
  return {
    ...user,
    displayName: user.displayName || user.username || user.email?.split('@')[0] || 'User',
    username: user.username || user.email?.split('@')[0] || 'user',
  };
}

export function useAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading, setUserFromSafe, logout: setLogout } = useAuthStore();

  const loginRef = useRef(false);
  const registerRef = useRef(false);

  const redirectUrl = searchParams.get('redirect') || READER_ROUTES.library;

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      if (loginRef.current) throw new Error('Login in progress');
      loginRef.current = true;
      return authApi.login(data);
    },
    onSuccess: async () => {
      loginRef.current = false;
      try {
        const safeUser = await authApi.getCurrentUser();
        if (!safeUser) throw new Error('Failed to get user data');

        setUserFromSafe(safeUser);
        queryClient.setQueryData(QUERY_KEYS.auth.user(), safeUser);
        
        const displayName = safeUser.displayName || safeUser.username || 'User';
        toast.success('Welcome back!', { description: `Logged in as ${displayName}` });
        requestAnimationFrame(() => router.push(redirectUrl));
      } catch {
        setLogout();
        toast.error('Login failed', { description: 'Unable to fetch user' });
      }
    },
    onError: (error: Error) => {
      loginRef.current = false;
      if (error.message === 'Login in progress') return;
      toast.error('Login failed', { description: formatError(error).message });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      if (registerRef.current) throw new Error('Registration in progress');
      registerRef.current = true;
      return authApi.register(data);
    },
    onSuccess: () => {
      registerRef.current = false;
      toast.success('Account created!', { description: 'Check your email to verify.' });
      router.push(AUTH_ROUTES.login);
    },
    onError: (error: Error) => {
      registerRef.current = false;
      if (error.message === 'Registration in progress') return;
      toast.error('Registration failed', { description: formatError(error).message });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      setLogout();
      queryClient.clear();
      router.push(AUTH_ROUTES.login);
    },
    onSuccess: () => toast.success('Logged out successfully'),
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: () => {
      toast.success('Reset email sent', { description: 'Check your inbox.' });
      router.push(AUTH_ROUTES.login);
    },
    onError: (error: Error) => {
      toast.error('Failed to send reset email', { description: formatError(error).message });
    },
  });

  return {
    user: normalizeAuthUser(user),
    isAuthenticated,
    isLoading,

    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    isSendingResetEmail: forgotPasswordMutation.isPending,
  };
}