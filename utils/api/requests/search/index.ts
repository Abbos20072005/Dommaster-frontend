import { api } from '@/utils/api/instance';

export const getSearch = (requestConfig?: RequestConfig) =>
  api.get<SearchResponse>('/search/', requestConfig?.config);

export const getMostSearched = (requestConfig?: RequestConfig) =>
  api.get<MostSearchedResponse>('/most/search/', requestConfig?.config);
