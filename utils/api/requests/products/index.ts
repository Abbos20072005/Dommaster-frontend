import { api, publicApi } from '@/utils/api/instance';

export const getProducts = ({ data, config }: RequestConfig<ProductRequest>) =>
  publicApi.post<ProductsResponse>('product/filter/', data, config);

export const getMostSoldProducts = (requestConfig?: RequestConfig) =>
  publicApi.get<ApiResponse<Product[]>>('most/sold/', requestConfig?.config);

export const getViewedProducts = (requestConfig?: RequestConfig) =>
  api.get<ProductsResponse>('recently/viewed/', requestConfig?.config);

export const getProductById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<ProductResponse>(`products/${id}/`, config);

/**
 * Product details with the customer's token. The backend adds the product to the customer's
 * "recently viewed" list (and fills `is_favourite`, `in_cart`) only for an authorized request —
 * the product page must use this one, not the public `getProductById`.
 */
export const getAuthorizedProductById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ProductResponse>(`products/${id}/`, config);
