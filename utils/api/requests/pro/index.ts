import { api } from '@/utils/api/instance';

type Id = { id: number | string };

export const getProProjects = ({
  status,
  config
}: RequestConfig & { status?: ProProjectStatus } = {}) =>
  api.get<ProProjectsResponse>('/pro/projects/', {
    ...config,
    params: { status, ...config?.params }
  });

export const getProProject = ({ id, config }: RequestConfig & Id) =>
  api.get<ProProjectResponse>(`/pro/projects/${id}/`, config);

export const getProProjectSummary = ({ id, config }: RequestConfig & Id) =>
  api.get<ProProjectSummaryResponse>(`/pro/projects/${id}/summary/`, config);

export const getProProjectItems = ({ id, config }: RequestConfig & Id) =>
  api.get<ProProjectItemsResponse>(`/pro/projects/${id}/items/`, config);

export const postProProject = ({ data, config }: RequestConfig<ProProjectRequest>) =>
  api.post<ProProjectResponse>('/pro/projects/', data, config);

export const patchProProject = ({
  id,
  data,
  config
}: RequestConfig<Partial<ProProjectRequest>> & Id) =>
  api.patch<ProProjectResponse>(`/pro/projects/${id}/`, data, config);

export const postProProjectArchive = ({ id, config }: RequestConfig & Id) =>
  api.post<ProProjectResponse>(`/pro/projects/${id}/archive/`, undefined, config);

export const postProProjectRestore = ({ id, config }: RequestConfig & Id) =>
  api.post<ProProjectResponse>(`/pro/projects/${id}/restore/`, undefined, config);

export const deleteProProject = ({ id, config }: RequestConfig & Id) =>
  api.delete(`/pro/projects/${id}/`, config);

export const postProOrderLink = ({
  orderId,
  data,
  config
}: RequestConfig<ProLinkRequest> & { orderId: number | string }) =>
  api.post<ProLinkResponse>(`/pro/orders/${orderId}/link/`, data, config);

export const postProOrderUnlink = ({
  orderId,
  data,
  config
}: RequestConfig<ProUnlinkRequest> & { orderId: number | string }) =>
  api.post<ProLinkResponse>(`/pro/orders/${orderId}/unlink/`, data, config);

export const getProUnlinkedOrders = ({ config }: RequestConfig = {}) =>
  api.get<ProUnlinkedOrdersResponse>('/pro/orders/unlinked/', config);

export const getProDashboard = ({ config }: RequestConfig = {}) =>
  api.get<ProDashboardResponse>('/pro/dashboard/', config);
