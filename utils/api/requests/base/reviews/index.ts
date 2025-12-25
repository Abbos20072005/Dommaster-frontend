import { publicApi } from '@/utils/api/instance';

export const getReviews = (requestConfig?: RequestConfig) =>
  publicApi.get<ReviewsResponse>('/base/reviews/', requestConfig?.config);

export const getReviewById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<ReviewResponse>(`/base/reviews/${id}/`, config);
