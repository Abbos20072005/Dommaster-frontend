import { api } from '@/utils/api/instance';

export const getBrandById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<BrandResponse>(`/brands/${id}/`, config);
