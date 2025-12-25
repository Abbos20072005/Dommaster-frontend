import { publicApi } from '@/utils/api/instance';

export const postRegister = ({ config, data }: RequestConfig<RegisterRequest>) =>
  publicApi.post<RegisterResponse>('auth/register/', data, config);
