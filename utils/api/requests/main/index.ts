import { api } from '@/utils/api/instance';

export const getMain = (requestConfig?: RequestConfig) =>
  api.get<MainResponse>('/main/', requestConfig?.config);
