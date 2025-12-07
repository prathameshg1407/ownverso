// ==== FILE: lib/stores/auth.store.ts ====
/**
 * Authentication Store
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthUser, SafeUser } from '@/types/api';
import { toAuthUser } from '@/types/api';
import { AUTH_CONFIG } from '@/lib/constants/config';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionChecked: boolean;
}

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setUserFromSafe: (user: SafeUser | null) => void;
  login: (user: SafeUser) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  markSessionChecked: () => void;
  reset: () => void;
}

interface AuthSelectors {
  isEmailVerified: () => boolean;
  isAccountActive: () => boolean;
  needsEmailVerification: () => boolean;
}

type AuthStore = AuthState & AuthActions & AuthSelectors;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  sessionChecked: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isLoading: false, sessionChecked: true }),

      setUserFromSafe: (safeUser) =>
        set({
          user: safeUser ? toAuthUser(safeUser) : null,
          isAuthenticated: !!safeUser,
          isLoading: false,
          sessionChecked: true,
        }),

      login: (safeUser) =>
        set({ user: toAuthUser(safeUser), isAuthenticated: true, isLoading: false, sessionChecked: true }),

      logout: () => set({ ...initialState, isLoading: false, sessionChecked: true }),

      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),

      markSessionChecked: () => set({ sessionChecked: true }),

      reset: () => set(initialState),

      isEmailVerified: () => get().user?.emailVerified ?? false,
      isAccountActive: () => get().user?.status === 'ACTIVE',
      needsEmailVerification: () => {
        const user = get().user;
        return user?.status === 'PENDING_VERIFICATION' && !user.emailVerified;
      },
    }),
    {
      name: AUTH_CONFIG.storageKey,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isLoading = false;
      },
    }
  )
);

export const getAuthState = () => useAuthStore.getState();
export const getUser = () => useAuthStore.getState().user;
export const getIsAuthenticated = () => useAuthStore.getState().isAuthenticated;