import { api } from '@/utils/api/instance';

export const getCatalogs = (requestConfig?: RequestConfig) =>
  api.get<CatalogsResponse>('catalogs/', requestConfig?.config);
