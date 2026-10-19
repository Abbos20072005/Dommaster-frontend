'use client';

import type { AxiosResponse } from 'axios';

import { useQueryClient } from '@tanstack/react-query';

/**
 * Puts the product fetched on the server into the cache of the page: the components of the page
 * (title, price, description, specs) are rendered with it in the HTML, not after a request of
 * the browser. It must be the FIRST child of the page: it runs before the components that read
 * the same query, on the server and again on the client, so both renders are the same. The
 * browser then asks for the customer's own version (cart, favorites).
 */
export const ProductHydrate = ({ id, product }: { id: string; product: Product }) => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(['product', id])) {
    queryClient.setQueryData(['product', id], {
      data: { result: product, ok: true }
    } as AxiosResponse<ProductResponse>);
  }

  return null;
};
