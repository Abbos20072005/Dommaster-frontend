import { api } from '@/utils/api/instance';

export const getAbout = (requestConfig?: RequestConfig) =>
  api.get<AboutResponse>('/base/about/', requestConfig?.config);
