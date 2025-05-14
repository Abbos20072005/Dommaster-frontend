import { api } from '@/utils/api/instance';

export const postResetPasswordVerify = ({
  config,
  data
}: RequestConfig<ResetPasswordVerifyRequest>) =>
  api.post<ResetPasswordVerifyResponse>('auth/reset/password/verify/', data, config);
