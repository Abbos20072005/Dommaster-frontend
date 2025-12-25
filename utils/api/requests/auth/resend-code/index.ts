import { publicApi } from '@/utils/api/instance';

export const postResendCode = ({ data, config }: RequestConfig<ResendRequest>) =>
  publicApi.post<ResendResponse>('auth/otp/resend/', data, config);
