import { api } from '@/utils/api/instance';

export const getCartList = (requestConfig?: RequestConfig) =>
  api.get<CartListResponse>('/cart/', requestConfig?.config);

// `platform`: the backend counts the added item for the funnel of the site
export const postCart = ({ data, config }: RequestConfig<CartItemRequest>) =>
  api.post('/cart/item/', { platform: 'site', ...data }, config);

export const patchCart = ({ data, config }: RequestConfig<CartItemRequest>) =>
  api.patch<CartItemResponse>('/cart/item/', data, config);

export const postCartBulk = ({ data, config }: RequestConfig<CartBulkRequest>) =>
  api.post('/cart/item/bulk/', data, config);
