import { publicApi } from '@/utils/api/instance';

export const getSales = (requestConfig?: RequestConfig) =>
  publicApi.get<SalesResponse>('/sales/', requestConfig?.config);

export const getSaleMain = (requestConfig?: RequestConfig) =>
  publicApi.get<SaleMainResponse>('/sales/main/', requestConfig?.config);

export const getSaleById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<SaleResponse>(`/sales/${id}/`, config);
