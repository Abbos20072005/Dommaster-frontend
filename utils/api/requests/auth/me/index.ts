import { api } from '@/utils/api/instance';

export const getMe = (requestConfig?: RequestConfig) =>
  api.get<UserResponse>('auth/auth/me/', requestConfig?.config);

export const patchMe = ({ data, config }: RequestConfig<UserPatchRequest>) =>
  api.patch('auth/me/', data, config);
