import { api } from '@/utils/api/instance';

export const getOrdersActive = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/order/active/', requestConfig?.config);

export const getOrdersHistory = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/order/history/', requestConfig?.config);

export const getOrderById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<OrderResponse>(`/order/${id}/`, config);

export const postOrder = ({ data, config }: RequestConfig<OrderRequest>) =>
  api.post<OrderResponse>('/order/', data, config);
