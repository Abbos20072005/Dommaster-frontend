import { publicApi } from '@/utils/api/instance';

export const patchForgotPassword = ({ config, data }: RequestConfig<ForgotPasswordRequest>) =>
  publicApi.patch<ForgotPasswordResponse>('auth/forgot/password/', data, config);
