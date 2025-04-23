import { api } from '@/utils/api/instance';

export const getCategories = (requestConfig?: RequestConfig) =>
  api.get<CategoriesResponse>('/categories/', requestConfig?.config);

export const getCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<CategoryResponse>(`/categories/${id}`, config);

export const getSubCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<SubCategoryResponse>(`/sub/categories/${id}`, config);

export const getItemCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ItemCategoryResponse>(`/item/categories/${id}`, config);
