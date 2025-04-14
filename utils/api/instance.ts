import axios from 'axios';
import Cookies from 'js-cookie';

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
    locale = getServerLocale();
  } else {
    token = useAuthStore.getState().auth.accessToken;
    locale = Cookies.get('NEXT_LOCALE') || 'en';
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.headers['Accept-Language'] = locale;

  return config;
});

export { api };
