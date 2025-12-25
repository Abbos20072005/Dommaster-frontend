import { publicApi } from '@/utils/api/instance';

export const getAbout = (requestConfig?: RequestConfig) =>
  publicApi.get<AboutResponse>('/base/about/', requestConfig?.config);
