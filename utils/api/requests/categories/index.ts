import { api } from '@/utils/api/instance';

export const getCategories = (requestConfig?: RequestConfig) =>
  api.get<CategoriesResponse>('categories/', requestConfig?.config);
