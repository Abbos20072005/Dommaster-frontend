import { api } from '@/utils/api/instance';

export const getCatalogById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<CatalogsResponse>(`catalogs/${id}/`, config);
