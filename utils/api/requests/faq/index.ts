import { publicApi } from '@/utils/api/instance';

/** The active topics with their questions; `page` keeps only the questions tied to that page. */
export const getFaq = ({ config, page }: RequestConfig & { page?: FaqPageKey } = {}) =>
  publicApi.get<FaqResponse>('/faq/', { ...config, params: { ...config?.params, page } });
