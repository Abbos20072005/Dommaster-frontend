import { api } from '@/utils/api/instance';

export const getPromos = (requestConfig?: RequestConfig) =>
  api.get<PromosResponse>('/base/promocodes/', requestConfig?.config);

export const postPromoCodeChecker = ({ data, config }: RequestConfig<{ promocode: string }>) =>
  api.post<PromoCodeCheckerResponse>('/base/promocode/checker/', data, config);
