import { api } from '@/utils/api/instance';

export const postLogin = ({ config, data }: RequestConfig<LoginRequest>) =>
  api.post<LoginResponse>('auth/login/', data, config);
