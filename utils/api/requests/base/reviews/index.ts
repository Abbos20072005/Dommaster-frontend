import { api } from '@/utils/api/instance';

export const getReviews = (requestConfig?: RequestConfig) =>
  api.get<ReviewsResponse>('/base/reviews/', requestConfig?.config);

export const getReviewById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ReviewResponse>(`/base/reviews/${id}/`, config);
