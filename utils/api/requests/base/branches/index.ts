import { publicApi } from '@/utils/api/instance';

export const getBranches = (requestConfig?: RequestConfig) =>
  publicApi.get<BranchesResponse>('/base/branches/', requestConfig?.config);
