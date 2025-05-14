import { api } from '@/utils/api/instance';

export const postResetPassword = ({ data, config }: RequestConfig<ResetPasswordRequest>) =>
  api.post('auth/reset/password/', data, config);
