import { publicApi } from '@/utils/api/instance';

export const getCategories = (requestConfig?: RequestConfig) =>
  publicApi.get<CategoriesResponse>('/categories/', requestConfig?.config);

export const getCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<CategoryResponse>(`/categories/${id}`, config);

export const getSubCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<SubCategoryResponse>(`/sub/categories/${id}`, config);

export const getItemCategoryById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<ItemCategoryResponse>(`/item/categories/${id}`, config);
