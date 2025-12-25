import type { InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import { notFound } from 'next/navigation';

import { getClientToken } from './getClientToken';
import { getServerToken } from './getServerToken';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL
});

const publicApi = axios.create({
  baseURL: process.env.API_URL
});

const getCurrentLocale = (config: InternalAxiosRequestConfig<any>) => {
  config.headers['Accept-Language'] = 'ru';
  return config;
  // TODO later
  // if (typeof window === 'undefined') {
  //   return await getServerLocale();
  // }
  // return getClientLocale();
};

const attachAuthToken = async (config: InternalAxiosRequestConfig<any>) => {
  const token = typeof window === 'undefined' ? await getServerToken() : getClientToken();

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
