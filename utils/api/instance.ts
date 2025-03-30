import axios from 'axios';
// import { router } from 'next/client';

import { useAuthStore } from '@/utils/stores';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response
  // (error) => {
  //   if (error) {
  //     if (error.response?.status === 401) {
  //       useAuthStore.getState().auth.reset();
  //       router.push('/login');
  //     }
  //     if (error.response?.status === 500) {
  //       router.push('/500');
  //     } else if (error.response?.status === 403) {
  //       router.push('/403');
  //     }
  //   }
  // }
);

export { api };
