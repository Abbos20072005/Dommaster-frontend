import { api } from '@/utils/api/instance';

export const getProductById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ProductResponse>(`products/${id}/`, config);
