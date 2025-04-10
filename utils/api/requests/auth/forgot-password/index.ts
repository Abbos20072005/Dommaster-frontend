import { api } from '@/utils/api/instance';

export const postForgotPassword = ({ config, data }: RequestConfig<ForgotPasswordRequest>) =>
  api.post<ForgotPasswordResponse>('auth/forget-password', data, config);
