import { publicApi } from '@/utils/api/instance';

export const getSearch = (requestConfig?: RequestConfig) =>
  publicApi.get<SearchResponse>('/search/', requestConfig?.config);

export const getMostSearched = (requestConfig?: RequestConfig) =>
  publicApi.get<MostSearchedResponse>('/most/search/', requestConfig?.config);
