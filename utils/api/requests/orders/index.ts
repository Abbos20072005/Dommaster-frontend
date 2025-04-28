import { api } from '@/utils/api/instance';

export const getOrders = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/orders/', requestConfig?.config);

export const getOrderById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<OrderResponse>(`/orders/${id}/`, config);

export const postOrder = ({ data, config }: RequestConfig<OrderRequest>) =>
  api.post<OrderResponse>('/orders/', data, config);
