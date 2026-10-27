import { publicApi } from '@/utils/api/instance';

export const getStores = (requestConfig?: RequestConfig) =>
  publicApi.get<StoresResponse>('/base/stores/', requestConfig?.config);
