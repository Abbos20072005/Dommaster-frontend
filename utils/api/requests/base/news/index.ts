import { publicApi } from '@/utils/api/instance';

export const getNewsList = (requestConfig?: RequestConfig) =>
  publicApi.get<NewsListResponse>('/base/news/', requestConfig?.config);

export const getNewsById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<NewsResponse>(`/base/news/${id}/`, config);
