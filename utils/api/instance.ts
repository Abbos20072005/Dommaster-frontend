import axios from 'axios';
import { notFound } from 'next/navigation';

import { getToken } from '@/utils/api/getAccessToken';
import { getServerLocale } from '@/utils/api/getServerLocale';
import { useAuthStore } from '@/utils/stores';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL
});

api.interceptors.request.use(async (config) => {
  let token;
  let locale;
  if (typeof window === 'undefined') {
    token = await getToken();
    locale = await getServerLocale();
  } else {
    token = useAuthStore.getState().auth.accessToken;
    locale = 'ru';
    // locale = Cookies.get('NEXT_LOCALE') || routing.defaultLocale;
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.headers['Accept-Language'] = locale;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404) {
      notFound();
    }

    return Promise.reject(error);
  }
);

export { api };
