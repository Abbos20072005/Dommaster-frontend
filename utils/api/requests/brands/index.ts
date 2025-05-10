import { api } from '@/utils/api/instance';

export const getBrands = (requestConfig?: RequestConfig) =>
  api.get<BrandsResponse>('/brands/', requestConfig?.config);

export const getAddsBrands = (requestConfig?: RequestConfig) =>
  api.get<AddsBrandsResponse>('/adds/brands/', requestConfig?.config);

// export const getWidgets = (requestConfig?: RequestConfig) =>
// 	api.get<WidgetsResponse>('/base/test/', requestConfig?.config);
