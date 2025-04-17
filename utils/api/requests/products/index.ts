import { api } from '@/utils/api/instance';

export const getProducts = ({ data, config }: RequestConfig<ProductRequest>) =>
  api.post<ProductsResponse>('product/filter/', data, config);
