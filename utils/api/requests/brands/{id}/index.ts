import { publicApi } from '@/utils/api/instance';

export const getBrandById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<BrandResponse>(`/brands/${id}/`, config);
