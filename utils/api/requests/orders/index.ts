import { api } from '@/utils/api/instance';

export const getOrdersActive = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/orders/active/', requestConfig?.config);

export const getOrdersHistory = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/orders/history/', requestConfig?.config);

export const getOrderById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<OrderResponse>(`/orders/${id}/`, config);

export const postOrder = ({ data, config }: RequestConfig<OrderRequest>) =>
  api.post<OrderResponse>('/orders/', data, config);
