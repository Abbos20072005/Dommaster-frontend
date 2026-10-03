import type { InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import Cookies from 'js-cookie';
import { notFound } from 'next/navigation';
import * as React from 'react';

import { routing } from '@/i18n/routing';
import { COOKIES } from '@/utils/constants';

import { setAuthTokens } from './authTokens';
import { getClientLocale } from './getClientLocale';
import { getClientToken } from './getClientToken';
import { getServerLocale } from './getServerLocale';
import { getServerToken } from './getServerToken';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL
});

const publicApi = axios.create({
  baseURL: process.env.API_URL
});

// Server komponentda (RSC) React hook'lari (useState) bo'lmaydi — shu orqali uni klient komponentning
// serverdagi birinchi renderidan (SSR) ajratamiz. "use server" funksiyalarni (getServerLocale,
// getServerToken) faqat server komponentda chaqirish mumkin, SSR'da chaqirilsa Next.js xato beradi.
const isServerComponent = () => typeof window === 'undefined' && !('useState' in React);

// Backend ma'lumotlari (kategoriya, mahsulot nomlari va h.k.) tanlangan tilda qaytishi uchun
const getCurrentLocale = async (config: InternalAxiosRequestConfig<any>) => {
  // So'rovni chaqirgan joy tilni o'zi bergan bo'lsa (masalan useSuspenseQuery'da) — o'shani qoldiramiz
  if (config.headers['Accept-Language']) return config;

  if (typeof window !== 'undefined') {
    config.headers['Accept-Language'] = getClientLocale();
  } else if (isServerComponent()) {
    config.headers['Accept-Language'] = await getServerLocale();
  } else {
    config.headers['Accept-Language'] = routing.defaultLocale;
  }
  return config;
};

const attachAuthToken = async (config: InternalAxiosRequestConfig<any>) => {
  // Klient komponentning SSR'ida cookie'ni o'qib bo'lmaydi — token faqat brauzerda yoki server komponentda qo'shiladi
  const token =
    typeof window !== 'undefined'
      ? getClientToken()
      : isServerComponent()
        ? await getServerToken()
        : null;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(attachAuthToken);

api.interceptors.request.use(getCurrentLocale);

publicApi.interceptors.request.use(getCurrentLocale);

// Bir vaqtda kelgan bir nechta 401 uchun refresh bitta marta chaqiriladi
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async () => {
  const refresh = Cookies.get(COOKIES.REFRESH_TOKEN);
  if (!refresh) return null;

  try {
    const { data } = await axios.post(`${process.env.API_URL}auth/token/refresh/`, { refresh });
    // Spetsifikatsiyada javob shakli to'liq berilmagan — ma'lum variantlarni qabul qilamiz
    const accessToken: string | undefined =
      data?.result?.access_token ?? data?.result?.access ?? data?.access_token ?? data?.access;
    const refreshToken: string | undefined =
      data?.result?.refresh_token ?? data?.result?.refresh ?? data?.refresh_token ?? data?.refresh;
    if (!accessToken) return null;

    setAuthTokens(accessToken, refreshToken);
    return accessToken;
  } catch {
    return null;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 404) {
      notFound();
    }

    const original = error.config;
    if (
      error.response?.status === 401 &&
      typeof window !== 'undefined' &&
      original &&
      !original._retry
    ) {
      original._retry = true;
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const accessToken = await refreshPromise;
      if (accessToken) {
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      }
    }

    return Promise.reject(error);
  }
);

export { api, publicApi };
