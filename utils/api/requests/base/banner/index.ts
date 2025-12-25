import { publicApi } from '@/utils/api/instance';

export const getBanners = (requestConfig?: RequestConfig) =>
  publicApi.get<BannersResponse>('/base/banner/', requestConfig?.config);
