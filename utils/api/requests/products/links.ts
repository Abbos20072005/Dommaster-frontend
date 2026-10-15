import { api } from '@/utils/api/instance';

interface ProductLinks {
  /** bought together with the product; picked by hand, most products have none */
  related: Product[];
  /** can be bought instead of the product */
  alternatives: Product[];
  /** `manual`: picked by hand; `category`: popular products of the category; `null`: no alternatives */
  alternatives_source: 'manual' | 'category' | null;
}

/** "Bought together" and "Alternatives" of the product page (up to 10 products each). */
export const getProductLinks = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<ApiResponse<ProductLinks>>(`products/${id}/links/`, config);

/** The cart's "Don't forget" block: the products picked for the cart items, not in the cart. */
export const getCartCrossSell = (requestConfig?: RequestConfig) =>
  api.get<ApiResponse<Product[]>>('cart/cross-sell/', requestConfig?.config);
