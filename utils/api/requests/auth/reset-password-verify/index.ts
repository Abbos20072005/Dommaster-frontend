import { publicApi } from '@/utils/api/instance';

export const postResetPasswordVerify = ({
  config,
  data
}: RequestConfig<ResetPasswordVerifyRequest>) =>
  publicApi.post<ResetPasswordVerifyResponse>('auth/reset/password/verify/', data, config);
