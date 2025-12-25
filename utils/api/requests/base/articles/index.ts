import { publicApi } from '@/utils/api/instance';

export const getArticles = (requestConfig?: RequestConfig) =>
  publicApi.get<ArticlesResponse>('/base/articles/', requestConfig?.config);

export const getArticleById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<ArticleResponse>(`/base/articles/${id}/`, config);
