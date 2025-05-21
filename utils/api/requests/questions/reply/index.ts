import { api } from '@/utils/api/instance';

export const getQuestionReplies = ({
  questionId,
  config
}: RequestConfig & { questionId: number | string }) =>
  api.get<ProductQuestionRepliesResponse>(`/questions/${questionId}/replies/`, config);

export const postQuestionReply = ({
  questionId,
  data,
  config
}: RequestConfig<ProductQuestionReplyRequest> & { questionId: number | string }) =>
  api.post(`/questions/${questionId}/reply/`, data, config);

export const patchQuestionReplyById = ({
  id,
  data,
  config
}: RequestConfig<ProductQuestionReplyRequest> & { id: number | string }) =>
  api.patch(`/questions/reply/${id}/`, data, config);

export const deleteQuestionReplyById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.delete(`/questions/reply/${id}/`, config);
