import { publicApi } from '@/utils/api/instance';

export const postVerify = ({ data, config }: RequestConfig<VerifyRequest>) =>
  publicApi.post<VerifyResponse>('auth/otp/verify/', data, config);
