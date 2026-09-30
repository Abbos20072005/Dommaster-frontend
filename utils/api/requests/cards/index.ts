import { api } from '@/utils/api/instance';

const BASE_URL = (process.env.API_URL ?? '').replace(/\/api\/v1\/?$/, '');

export const getCustomerCards = (requestConfig?: RequestConfig) =>
  api.get<CustomerCardsResponse>(`${BASE_URL}/customer/cards/`, requestConfig?.config);

export const postCardBindInit = () =>
  api.post<CardBindInitResponse>(`${BASE_URL}/atmos/card-bind/init/`);

export const patchCustomerCard = ({
  id,
  data,
  config
}: RequestConfig<{ is_default: boolean }> & { id: number | string }) =>
  api.patch<CustomerCardResponse>(`${BASE_URL}/customer/cards/${id}/`, data, config);

export const postPaymentHold = ({ data, config }: RequestConfig<{ order_id: number }>) =>
  api.post(`${BASE_URL}/payment/hold/create/`, data, config);
