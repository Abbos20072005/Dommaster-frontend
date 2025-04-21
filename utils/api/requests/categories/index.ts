import { api } from '@/utils/api/instance';

export const getCategories = (requestConfig?: RequestConfig) =>
  api.get<CategoriesResponse>('/categories/', requestConfig?.config);

export const getCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<CategoryResponse>(`/sub/categories/${id}`, config);

export const getSubCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<SubCategoryResponse>(`/item/categories/${id}`, config);
