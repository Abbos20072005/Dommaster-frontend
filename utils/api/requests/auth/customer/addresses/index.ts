import { api } from '@/utils/api/instance';

export const getCustomerAddresses = (requestConfig?: RequestConfig) =>
  api.get<AddressesResponse>('/auth/customer/addresses/', requestConfig?.config);

export const postCustomerAddress = ({ data, config }: RequestConfig<AddressRequest>) =>
  api.post<AddressResponse>('/auth/customer/addresses/', data, config);

export const patchCustomerAddress = ({
  id,
  data,
  config
}: RequestConfig<AddressRequest> & { id: number | string }) =>
  api.patch<AddressResponse>(`/auth/customer/addresses/${id}/`, data, config);

export const deleteCustomerAddress = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.delete<AddressResponse>(`/auth/customer/addresses/${id}/`, config);
