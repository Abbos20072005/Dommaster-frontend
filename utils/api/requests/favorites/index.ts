import { api } from '@/utils/api/instance';

export const getFavorites = (requestConfig?: RequestConfig) =>
  api.get<ApiResponse<Product[]>>('/favourite/list/', requestConfig?.config);

export const postFavorite = ({ data, config }: RequestConfig<{ product: number }>) =>
  api.post<ProductResponse>('/favourite/create/', data, config);
