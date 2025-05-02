import { api } from '@/utils/api/instance';

export const getSales = (requestConfig?: RequestConfig) =>
  api.get<SalesResponse>('/sales/', requestConfig?.config);

export const getSaleMain = (requestConfig?: RequestConfig) =>
  api.get<SaleMainResponse>('/sales/main/', requestConfig?.config);

export const getSaleById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<SaleResponse>(`/sales/${id}/`, config);
