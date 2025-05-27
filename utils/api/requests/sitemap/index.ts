import { noCookieApi } from '@/utils/api/no-cookie-instance';

export const getSitemapProducts = ({ data, config }: RequestConfig<ProductRequest>) =>
  noCookieApi.post<ProductsResponse>('product/filter/', data, config);
