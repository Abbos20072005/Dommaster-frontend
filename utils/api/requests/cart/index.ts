import { api } from '@/utils/api/instance';

export const getCartList = (requestConfig?: RequestConfig) =>
  api.get<CartListResponse>('/cart/', requestConfig?.config);

export const postCart = ({ data, config }: RequestConfig<CartItemRequest>) =>
  api.post('/cart/item/', data, config);

export const patchCart = ({ data, config }: RequestConfig<CartItemRequest>) =>
  api.patch<CartItemResponse>('/cart/item/', data, config);

export const postCartBulk = ({ data, config }: RequestConfig<CartBulkRequest>) =>
  api.post('/cart/item/bulk/', data, config);
