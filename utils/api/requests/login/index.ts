import { api } from '@/utils/api/instance';

export const postLogin = ({ config, data }: RequestConfig<LoginRequest>) =>
  api.post<LoginResponse>('login/', data, config);
