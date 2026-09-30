import type { InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import { notFound } from 'next/navigation';
import * as React from 'react';

import { routing } from '@/i18n/routing';

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
  // ESKI KOD:
  // config.headers['Accept-Language'] = 'ru';
  // return config;
};

const attachAuthToken = async (config: InternalAxiosRequestConfig<any>) => {
  // Klient komponentning SSR'ida cookie'ni o'qib bo'lmaydi — token faqat brauzerda yoki server komponentda qo'shiladi
  const token =
    typeof window !== 'undefined'
      ? getClientToken()
      : isServerComponent()
        ? await getServerToken()
        : null;
  // ESKI KOD: const token = typeof window === 'undefined' ? await getServerToken() : getClientToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(attachAuthToken);

api.interceptors.request.use(getCurrentLocale);

publicApi.interceptors.request.use(getCurrentLocale);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404) {
      notFound();
    }

    return Promise.reject(error);
  }
);

export { api, publicApi };
