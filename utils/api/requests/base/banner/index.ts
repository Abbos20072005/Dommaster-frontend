import { api } from '@/utils/api/instance';

export const getBanners = (requestConfig?: RequestConfig) =>
  api.get<BannersResponse>('/base/banner', requestConfig?.config);
