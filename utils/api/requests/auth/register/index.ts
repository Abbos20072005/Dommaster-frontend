import { api } from '@/utils/api/instance';

export const postRegister = ({ config, data }: RequestConfig<RegisterRequest>) =>
  api.post<RegisterResponse>('register/', data, config);
