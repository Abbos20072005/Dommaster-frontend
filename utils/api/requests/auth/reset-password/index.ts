import { publicApi } from '@/utils/api/instance';

export const postResetPassword = ({ data, config }: RequestConfig<ResetPasswordRequest>) =>
  publicApi.post('auth/reset/password/', data, config);
