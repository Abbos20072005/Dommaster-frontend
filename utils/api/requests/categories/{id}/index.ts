import { api } from '@/utils/api/instance';

export const getCatalogById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<CategoriesResponse>(`catalogs/${id}/`, config);
