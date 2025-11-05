import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Authentication store
 * Handles JWT tokens and user state
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),

      isAuthenticated: () => {
        const state = useAuthStore.getState()
        return !!state.accessToken
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
