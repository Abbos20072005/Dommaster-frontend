import Cookies from 'js-cookie';
import { create } from 'zustand';

import { COOKIES } from '@/utils/constants/cookies';

interface AuthState {
  auth: {
    user: User | null | undefined;
    setUser: (user: User | null | undefined) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    refreshToken: string | null;
    setRefreshToken: (refreshToken: string) => void;
    resetRefreshToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  const accessToken = Cookies.get(COOKIES.ACCESS_TOKEN) || null;
  const refreshToken = Cookies.get(COOKIES.REFRESH_TOKEN) || null;
  return {
    auth: {
      user: undefined,
      setUser: (user) => set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(COOKIES.ACCESS_TOKEN, accessToken);
          return { ...state, auth: { ...state.auth, accessToken } };
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(COOKIES.ACCESS_TOKEN);
          return { ...state, auth: { ...state.auth, accessToken: '' } };
        }),
      refreshToken,
      setRefreshToken: (refreshToken) =>
        set((state) => {
          Cookies.set(COOKIES.REFRESH_TOKEN, refreshToken);
          return { ...state, auth: { ...state.auth, refreshToken } };
        }),
      resetRefreshToken: () =>
        set((state) => {
          Cookies.remove(COOKIES.REFRESH_TOKEN);
          return { ...state, auth: { ...state.auth, refreshToken: '' } };
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(COOKIES.ACCESS_TOKEN);
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: null, refreshToken: null }
          };
        })
    }
  };
});

export const useAuth = () => useAuthStore((state) => state.auth);
