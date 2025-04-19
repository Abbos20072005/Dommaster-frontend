import { api } from '@/utils/api/instance';

export const getSearch = (requestConfig?: RequestConfig) =>
  api.get<SearchResponse>('/search/', requestConfig?.config);
