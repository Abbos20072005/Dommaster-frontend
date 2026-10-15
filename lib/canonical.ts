import type { Metadata } from 'next';

import { BASE_URL } from '@/utils/constants';

/** Parameters that do not make a page of their own: the page points at the clean address. */
const SERVICE_PARAMS = new Set(['page', 'sort', 'sort_by', 'tab', 'brand', 'page_size']);

const isTracking = (key: string) => key.startsWith('utm_') || ['gclid', 'yclid', 'fbclid'].includes(key);

/**
 * The canonical address and the robots rule of a page (BLD-240):
 * - `?page=N` is a page of the list: it is its own canonical (a plain link in the HTML);
 * - sorting, tab and tracking parameters point at the clean address;
 * - a filter (price, attributes ...) is `noindex` until the list of indexed filters is agreed;
 * - the search results are `noindex`.
 */
export const getCanonicalMetadata = (
  pathname: string | null,
  search: string | null
): Pick<Metadata, 'alternates' | 'robots'> => {
  if (!pathname) return {};

  const params = new URLSearchParams(search ?? '');
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const page = Number(params.get('page'));
  const canonical = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}${
    page > 1 ? `?page=${page}` : ''
  }`;

  const isSearch = cleanPath === '/search';
  const hasFilter = [...params.keys()].some((key) => !SERVICE_PARAMS.has(key) && !isTracking(key));

  return {
    alternates: { canonical },
    ...(isSearch || hasFilter ? { robots: { index: false, follow: true } } : {})
  };
};
