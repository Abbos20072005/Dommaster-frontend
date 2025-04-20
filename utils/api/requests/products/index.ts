import { api } from '@/utils/api/instance';

export const getProducts = ({ data, config }: RequestConfig<ProductRequest>) =>
  api.post<ProductsResponse>('product/filter/', data, config);

export const getProductById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ProductResponse>(`products/${id}/`, config);
