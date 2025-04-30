import { api } from '@/utils/api/instance';

export const getComments = (requestConfig?: RequestConfig) =>
  api.get<ProductCommentsResponse>('/comments/list/', requestConfig?.config);

export const getMyComments = (requestConfig?: RequestConfig) =>
  api.get<ProductCommentsResponse>('/comments/me/', requestConfig?.config);

export const postComment = ({ data, config }: RequestConfig<ProductCommentRequest>) =>
  api.post<ProductCommentResponse>('/comments/', data, config);

export const patchCommentById = ({
  id,
  data,
  config
}: RequestConfig<ProductCommentRequest> & { id: number | string }) =>
  api.patch<ProductCommentResponse>(`/comments/${id}/`, data, config);

export const deleteCommentById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.delete<ProductCommentResponse>(`/comments/${id}/`, config);
