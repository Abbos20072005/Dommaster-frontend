import { api } from '@/utils/api/instance';

export const postVerify = ({ data, config }: RequestConfig<VerifyRequest>) =>
  api.post<VerifyResponse>('auth/otp/verify/', data, config);
