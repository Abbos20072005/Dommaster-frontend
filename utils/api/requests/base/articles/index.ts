import { api } from '@/utils/api/instance';

export const getArticles = (requestConfig?: RequestConfig) =>
  api.get<ArticlesResponse>('/base/articles/', requestConfig?.config);

export const getArticleById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ArticleResponse>(`/base/articles/${id}/`, config);
