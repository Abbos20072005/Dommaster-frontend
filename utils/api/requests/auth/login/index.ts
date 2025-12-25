import { publicApi } from '@/utils/api/instance';

export const postLogin = ({ config, data }: RequestConfig<LoginRequest>) =>
  publicApi.post<LoginResponse>('auth/login/', data, config);
