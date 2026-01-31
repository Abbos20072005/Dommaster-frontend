import { api } from '@/utils/api/instance';

export const getOrdersActive = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/order/active/', requestConfig?.config);

export const getOrdersHistory = (requestConfig?: RequestConfig) =>
  api.get<OrdersResponse>('/order/history/', requestConfig?.config);

export const getOrderById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<OrderResponse>(`/order/${id}/`, config);

export const postOrder = ({ data, config }: RequestConfig<OrderRequest>) =>
  api.post<{
    result: string | null;
    order_id: number;
    ok: boolean;
  }>('/order/', data, config);

export const postOrderPay = ({ data, config }: RequestConfig<OrderPayRequest>) =>
  api.post<ApiResponse<string>>('/order/pay/', data, config);

export const postOrderCancel = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.post<OrderResponse>(`/order/${id}/cancel/`, config);
