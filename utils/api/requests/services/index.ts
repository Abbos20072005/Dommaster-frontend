import { api } from '@/utils/api/instance';

export const getServices = (requestConfig?: RequestConfig) =>
  api.get<ServicesResponse>('/services/', requestConfig?.config);

export const getServiceById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ServiceResponse>(`/services/${id}/`, config);
