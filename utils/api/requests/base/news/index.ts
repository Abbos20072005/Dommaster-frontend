import { api } from '@/utils/api/instance';

export const getNewsList = (requestConfig?: RequestConfig) =>
  api.get<NewsListResponse>('/base/news/', requestConfig?.config);

export const getNewsById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<NewsResponse>(`/base/news/${id}/`, config);
