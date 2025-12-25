import { api, publicApi } from '@/utils/api/instance';

export const getQuestions = (requestConfig?: RequestConfig) =>
  publicApi.get<ProductQuestionsResponse>('/questions/list/', requestConfig?.config);

export const getMyQuestions = (requestConfig?: RequestConfig) =>
  api.get<ProductQuestionsResponse>('/questions/me/', requestConfig?.config);

export const postQuestion = ({ data, config }: RequestConfig<ProductQuestionRequest>) =>
  api.post<ProductQuestionResponse>('/questions/', data, config);

export const patchQuestionById = ({
  id,
  data,
  config
}: RequestConfig<ProductQuestionRequest> & { id: number | string }) =>
  api.patch<ProductQuestionResponse>(`/questions/${id}/`, data, config);

export const deleteQuestionById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.delete<ProductQuestionResponse>(`/questions/${id}/`, config);
