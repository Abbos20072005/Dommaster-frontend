import { api } from '@/utils/api/instance';

export const getPromos = (requestConfig?: RequestConfig) =>
  api.get<PromosResponse>('/promos/', requestConfig?.config);
