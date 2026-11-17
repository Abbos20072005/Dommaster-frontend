import {
  matchBrandSlug,
  matchCatalogSlugs,
  productListUpdatedAt,
  productUpdatedAt,
  toLanguage
} from './catalogTree';
import { DEFAULT_SORT_BY } from '@/components/ProductFilterPaginated/constants';
import { productIdFromParam } from './urls';

/** the same page size as the server render of the lists (`getInitialProducts`) */
const PAGE_SIZE = 20;

/**
 * The API gives the date in the time of Tashkent without a zone, with microseconds:
 * "2026-10-30T14:13:08.489201" is 09:13:08 GMT. It is cut to whole seconds: the HTTP date has no
 * fractions, so `If-Modified-Since` (the date we sent) must be equal to it (BLD-451).
 */
export const parseApiDate = (value?: string | null) => {
  if (!value) return null;
  const zone = /(Z|[+-]\d\d:?\d\d)$/.exec(value)?.[1] ?? '+05:00';
  const date = new Date(`${value.slice(0, 19)}${zone}`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const latest = (dates: (Date | null)[]) => {
  const times = dates.flatMap((date) => (date ? date.getTime() : []));
  return times.length ? new Date(Math.max(...times)) : null;
};

/** the page of the list: `?page=N` (anything but a whole number above 1 is the first page) */
const pageOf = (search?: string) => {
  const page = Number(new URLSearchParams(search).get('page'));
  return Number.isInteger(page) && page > 1 ? page : 1;
};

/**
 * The date of the last change of the page (BLD-352, BLD-451), for `Last-Modified` and a 304 answer.
 * - a product: its `updated_at` (the price, the stock, the text);
 * - a category or a brand: the latest of its own `updated_at` and the `updated_at` of the products
 *   on the page (the list changes when a product changes, not when the category does).
 * `null` for any other page, or when a date is not known (no date, no 304: the page is sent in full).
 */
export const pageLastModified = async (
  pathname: string,
  locale?: string | null,
  search?: string
): Promise<Date | null> => {
  const language = toLanguage(locale);

  const product = /^\/product\/([^/]+)\/?$/.exec(pathname);
  if (product) {
    const id = productIdFromParam(decodeURIComponent(product[1]));
    return id ? parseApiDate(await productUpdatedAt(Number(id), language)) : null;
  }

  const listBody = (filter: Record<string, number>) => ({
    sort_by: DEFAULT_SORT_BY,
    page: pageOf(search),
    page_size: PAGE_SIZE,
    ...filter
  });

  const catalog = /^\/catalog\/(.+?)\/?$/.exec(pathname);
  if (catalog) {
    const match = await matchCatalogSlugs(catalog[1].split('/').map(decodeURIComponent), language);
    if (!match) return null;
    const key = ['category', 'sub_category', 'item_category'][match.ids.length - 1];
    const dates = await productListUpdatedAt(listBody({ [key]: match.ids.at(-1) as number }), language);
    const own = parseApiDate(match.updatedAt);
    return dates && own ? latest([own, ...dates.map(parseApiDate)]) : null;
  }

  const brand = /^\/brand\/([^/]+)\/?$/.exec(pathname);
  if (brand) {
    const match = await matchBrandSlug(decodeURIComponent(brand[1]), language);
    if (!match) return null;
    const dates = await productListUpdatedAt(listBody({ brand: match.id }), language);
    const own = parseApiDate(match.updatedAt);
    return dates && own ? latest([own, ...dates.map(parseApiDate)]) : null;
  }

  return null;
};
