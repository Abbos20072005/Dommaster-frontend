import {
  matchBrandSlug,
  matchCatalogSlugs,
  productUpdatedAt,
  toLanguage
} from './catalogTree';
import { productIdFromParam } from './urls';

/** the crawlers: they get `Last-Modified` even on a first visit (others only when they send `If-Modified-Since`) */
const CRAWLER = /bot|crawl|spider|slurp|yandex|bing|duckduck|baidu|facebookexternalhit|embedly/i;

export const isCrawler = (userAgent: string | null) => !!userAgent && CRAWLER.test(userAgent);

/**
 * The API gives the date without a time zone (UTC), with microseconds: "2026-10-06T14:56:44.492854".
 * It is cut to whole seconds: the HTTP date has no fractions, so `If-Modified-Since` (the date we
 * sent) must be equal to it.
 */
const parseApiDate = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(`${value.slice(0, 19)}${/Z|[+-]\d\d:?\d\d$/.test(value) ? '' : 'Z'}`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfTodayUtc = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

/**
 * The date of the last change of the page (BLD-352), for `Last-Modified` and a 304 answer.
 * - a product: its `updated_at` (the price, the stock, the text);
 * - a category or a brand: its `updated_at`, but not older than today's midnight: the list of
 *   products on the page changes without the category changing, so such a page is "new" once a day.
 * `null` for any other page (no date, no 304).
 */
export const pageLastModified = async (
  pathname: string,
  locale?: string | null
): Promise<Date | null> => {
  const language = toLanguage(locale);

  const product = /^\/product\/([^/]+)\/?$/.exec(pathname);
  if (product) {
    const id = productIdFromParam(decodeURIComponent(product[1]));
    return id ? parseApiDate(await productUpdatedAt(Number(id), language)) : null;
  }

  const floor = (date: Date | null) =>
    date && new Date(Math.max(date.getTime(), startOfTodayUtc().getTime()));

  const catalog = /^\/catalog\/(.+?)\/?$/.exec(pathname);
  if (catalog) {
    const match = await matchCatalogSlugs(catalog[1].split('/').map(decodeURIComponent), language);
    return floor(parseApiDate(match?.updatedAt));
  }

  const brand = /^\/brand\/([^/]+)\/?$/.exec(pathname);
  if (brand) {
    const match = await matchBrandSlug(decodeURIComponent(brand[1]), language);
    return floor(parseApiDate(match?.updatedAt));
  }

  return null;
};
