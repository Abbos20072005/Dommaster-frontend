import { publicApi } from '@/utils/api/instance';

export const getBrands = (requestConfig?: RequestConfig) =>
  publicApi.get<BrandsResponse>('/brands/', requestConfig?.config);

export const getAddsBrands = (requestConfig?: RequestConfig) =>
  publicApi.get<AddsBrandsResponse>('/adds/brands/', requestConfig?.config);
