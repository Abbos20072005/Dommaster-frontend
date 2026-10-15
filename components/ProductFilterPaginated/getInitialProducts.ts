import { getProducts } from '@/utils/api/requests';

import { resolveSortBy } from './constants';

/** Page size of the lists: the same as the client's default (`useFilter`). */
const PAGE_SIZE = 20;

/**
 * The first page of a product list for the server render (the products and their links are in
 * the HTML). The request is the one the client sends for the untouched list. A failure gives
 * `undefined`: the client then loads the list itself.
 */
export const getInitialProducts = async (queries: Partial<ProductRequest>) => {
  try {
    const response = await getProducts({
      data: { sort_by: resolveSortBy(null, null), page: 1, page_size: PAGE_SIZE, ...queries }
    });
    return response.data;
  } catch {
    return undefined;
  }
};
