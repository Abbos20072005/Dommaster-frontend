import { api } from '@/utils/api/instance';

export const getProducts = ({ data, config }: RequestConfig<ProductRequest>) =>
  api.post<ProductsResponse>('product/filter/', data, config);

export const getMostSoldProducts = (requestConfig?: RequestConfig) =>
  api.get<ApiResponse<Product[]>>('most/sold/', requestConfig?.config);

export const getViewedProducts = (requestConfig?: RequestConfig) =>
  api.get<ProductsResponse>('recently/viewed/', requestConfig?.config);

export const getProductById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ProductResponse>(`products/${id}/`, config);
