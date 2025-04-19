import { api } from '@/utils/api/instance';

export const getCustomerAddresses = (requestConfig?: RequestConfig) =>
  api.get<AddressesResponse>('/auth/customer/address/', requestConfig?.config);

export const getCustomerAddressById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<AddressResponse>(`/auth/customer/address/${id}/`, config);

export const postCustomerAddress = ({ data, config }: RequestConfig<AddressRequest>) =>
  api.post('/auth/customer/address/create/', data, config);

export const patchCustomerAddress = ({
  id,
  data,
  config
}: RequestConfig<AddressRequest> & { id: number | string }) =>
  api.patch<AddressResponse>(`/auth/customer/address/update/${id}/`, data, config);

export const deleteCustomerAddress = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.delete<AddressResponse>(`/auth/customer/address/delete/${id}/`, config);
