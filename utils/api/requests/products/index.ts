import { api } from '@/utils/api/instance';

export const getProducts = (requestConfig?: RequestConfig) =>
  api.get<ProductsResponse>('products/', requestConfig?.config);
