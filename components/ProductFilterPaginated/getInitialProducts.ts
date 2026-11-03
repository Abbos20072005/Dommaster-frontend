import { notFound } from 'next/navigation';

import { getProducts } from '@/utils/api/requests';

import { resolveSortBy } from './constants';

/** Page size of the lists: the same as the client's default (`useFilter`). */
const PAGE_SIZE = 20;

/** `?page=N` of the address as a page number: anything but a whole number above 1 is the first page. */
export const parsePage = (value: string | string[] | undefined) => {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 1 ? page : 1;
};

/**
 * A page of a product list for the server render (the products and their links are in the HTML,
 * also for `?page=N`). The request is the one the client sends for the untouched list. A failure
 * gives `undefined`: the client then loads the list itself. A page after the last one is a 404.
 */
export const getInitialProducts = async (queries: Partial<ProductRequest>, page = 1) => {
  try {
    const response = await getProducts({
      data: { sort_by: resolveSortBy(null, null), page, page_size: PAGE_SIZE, ...queries }
    });
    const result = response.data.result;
    const lastPage = Math.max(1, Math.ceil((result?.totalElements ?? 0) / PAGE_SIZE));
    // only a list that did answer can tell a missing page (a failed request must not become a 404)
    if (page > 1 && result && page > lastPage) throw new PageOutOfRange();
    return response.data;
  } catch (error) {
    if (error instanceof PageOutOfRange) notFound();
    return undefined;
  }
};

class PageOutOfRange extends Error {}
