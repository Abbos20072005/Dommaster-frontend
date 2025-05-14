import { api } from '@/utils/api/instance';

export const patchForgotPassword = ({ config, data }: RequestConfig<ForgotPasswordRequest>) =>
  api.patch<ForgotPasswordResponse>('auth/forgot/password/', data, config);
