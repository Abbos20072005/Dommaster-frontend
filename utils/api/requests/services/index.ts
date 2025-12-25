import { publicApi } from '@/utils/api/instance';

export const getServices = (requestConfig?: RequestConfig) =>
  publicApi.get<ServicesResponse>('/services/', requestConfig?.config);

export const getServiceById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<ServiceResponse>(`/services/${id}/`, config);
