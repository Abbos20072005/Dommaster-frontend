import { api } from '@/utils/api/instance';

export const getPromos = (requestConfig?: RequestConfig) =>
  api.get<PromosResponse>('/base/promocodes/', requestConfig?.config);

/**
 * Saves a promo code to the customer's account (the field on the "Promo codes" page).
 * The field name is not in the spec yet: the code is sent as `code` and `promocode`.
 */
export const postPromoCode = ({ data, config }: RequestConfig<{ code: string }>) =>
  api.post<PromoResponse>(
    '/base/promocodes/',
    { code: data?.code, promocode: data?.code },
    config
  );

export const postPromoCodeChecker = ({ data, config }: RequestConfig<{ promocode: string }>) =>
  api.post<PromoCodeCheckerResponse>('/base/promocode/checker/', data, config);
