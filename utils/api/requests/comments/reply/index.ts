import { api } from '@/utils/api/instance';

export const getCommentReplies = ({
  commentId,
  config
}: RequestConfig & { commentId: number | string }) =>
  api.get<ProductCommentRepliesResponse>(`/comment/${commentId}/replies/`, config);

export const postCommentReply = ({
  commentId,
  data,
  config
}: RequestConfig<ProductCommentReplyRequest> & { commentId: number | string }) =>
  api.post(`/comment/${commentId}/reply/`, data, config);

export const patchCommentReplyById = ({
  id,
  data,
  config
}: RequestConfig<ProductCommentReplyRequest> & { id: number | string }) =>
  api.patch(`/comment/reply/${id}/`, data, config);

export const deleteCommentReplyById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.delete(`/comment/reply/${id}/`, config);
