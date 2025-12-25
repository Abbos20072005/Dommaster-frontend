import { publicApi } from '@/utils/api/instance';

export const getMain = (requestConfig?: RequestConfig) =>
  publicApi.get<MainResponse>('/main/', requestConfig?.config);
