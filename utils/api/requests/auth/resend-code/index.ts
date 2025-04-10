import { api } from '@/utils/api/instance';

export const postResendCode = ({ data, config }: RequestConfig<ResendRequest>) =>
  api.post<ResendResponse>('auth/otp/resend/', data, config);
