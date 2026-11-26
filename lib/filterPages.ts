/**
 * The filter landing pages (brand × category, brand × sub-category, brand × item category, a size,
 * a pack): `GET filter-pages/`, `GET filter-pages/{slug}/`, `POST filter-pages/resolve/`.
 * The address of every level is `/catalog/{category}/{sub}/{item}/{slug}` (the breadcrumb slugs, then
 * the slug of the page): a page of a category has 1 catalog slug before its own, of a sub-category 2,
 * of an item category 3. Plain `fetch` with a memory cache, like `catalogTree`, so it works in the
 * sitemaps, the pages and the layout.
 */

import type { Language } from '@/lib/catalogTree';

import { cached, matchCatalogSlugs } from '@/lib/catalogTree';
import { splitLocale, withLocale } from '@/lib/localePath';
import { BASE_URL } from '@/utils/constants';

export type FilterPageLevel = 'category' | 'sub_category' | 'item_category';

export interface FilterPageBreadcrumb {
  id: number;
  name: string;
  slug: string;
  level: 'product_category' | 'product_sub_category' | 'product_item_category';
}

/** `product/filter/` body of the page (`filters` is `{}` above an item category) */
export interface FilterPageProductFilter {
  category?: number;
  sub_category?: number;
  item_category?: number;
  brand?: number;
  filters: Record<string, string[] | number>;
}

export interface FilterPageListItem {
  level: FilterPageLevel;
  slug: string;
  /** the H1 in the language of the request */
  title: string;
  /** `null` on a category / sub-category page */
  item_category: { id: number; slug: string } | null;
  /** category → … → the level of the page */
  breadcrumbs: FilterPageBreadcrumb[];
  brand: number | null;
  products_count: number;
  updated_at: string;
}

export interface FilterPageDetail {
  level: FilterPageLevel;
  id: number;
  slug: string;
  title: string;
  /** empty in the admin panel: the H1 */
  meta_title: string;
  /** empty in the admin panel: the start of `text` */
  meta_description: string;
  /** 300–500 characters of plain text, may be empty */
  text: string;
  item_category: { id: number; name: string; slug: string } | null;
  brand: { id: number; name: string } | null;
  breadcrumbs: FilterPageBreadcrumb[];
  product_filter: FilterPageProductFilter;
  products_count: number;
  updated_at: string;
}

/** the number of slugs before the slug of the page, by level (the breadcrumbs end at the level) */
const LEVEL_DEPTH: Record<FilterPageLevel, number> = { category: 1, sub_category: 2, item_category: 3 };

const MINUTES = 60 * 1000;

/** The answer of the API (`{ result }`); `undefined` when there is nothing in it. */
const unwrap = <T>(data: unknown): T | undefined => {
  if (!data || typeof data !== 'object') return undefined;
  return ('result' in data ? (data as { result?: T }).result : (data as T)) ?? undefined;
};

/**
 * The pages open for the sitemap and for the links on the category pages (most searched first).
 * A failed request is an error, not an empty list: it is not kept and does not empty a sitemap.
 */
export const getFilterPageList = (language: Language): Promise<FilterPageListItem[]> =>
  cached(
    `filter-pages:${language}`,
    async () => {
      const res = await fetch(`${process.env.API_URL}filter-pages/`, {
        headers: { 'Accept-Language': language }
      });
      if (!res.ok) throw new Error('filter pages are not available');
      return unwrap<FilterPageListItem[]>(await res.json()) ?? [];
    },
    10 * MINUTES
  );

/**
 * One page by its slug (`null`: there is no such page or it is closed: inactive, fewer than 3
 * products). Any other failure is an error: a failed request must not become a 404.
 */
export const getFilterPage = (slug: string, language: Language): Promise<FilterPageDetail | null> =>
  cached(
    `filter-page:${language}:${slug}`,
    async () => {
      const res = await fetch(`${process.env.API_URL}filter-pages/${encodeURIComponent(slug)}/`, {
        headers: { 'Accept-Language': language }
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('filter page is not available');
      return unwrap<FilterPageDetail>(await res.json()) ?? null;
    },
    5 * MINUTES
  );

/** `/catalog/{breadcrumb slugs}/{slug}` — the address of a page (in the language of its answer). */
export const filterPagePath = (page: { slug: string; breadcrumbs: { slug: string }[] }) =>
  `/catalog/${[...page.breadcrumbs.map((crumb) => crumb.slug), page.slug].join('/')}`;

export interface FilterPageMatch {
  page: FilterPageDetail;
  /** the address in the language of the request (the breadcrumb slugs are those of the language) */
  path: string;
}

/**
 * `/catalog/{a}/{b}/…/{slug}`: the last part is the slug of a page, the ones before it are the
 * catalog levels of the page. `null` when there is no such page; the caller redirects when the
 * address written is not `path` (other language of the levels, a wrong level).
 */
export const matchFilterPage = async (
  slugs: string[],
  language: Language
): Promise<FilterPageMatch | null> => {
  if (slugs.length < 2 || slugs.length > 4) return null;
  const page = await getFilterPage(slugs.at(-1)!, language);
  if (!page || page.breadcrumbs.length !== LEVEL_DEPTH[page.level]) return null;
  return { page, path: filterPagePath(page) };
};

/** The pages of one catalog level and id (`category`, `sub_category` or `item_category`), for the links. */
export const getFilterPagesOf = async (
  level: FilterPageLevel,
  id: number,
  language: Language
): Promise<FilterPageListItem[]> => {
  try {
    return (await getFilterPageList(language)).filter((page) => {
      const crumb = page.breadcrumbs[LEVEL_DEPTH[level] - 1];
      return page.level === level && crumb?.id === id;
    });
  } catch {
    return [];
  }
};

/**
 * `POST filter-pages/resolve/`: the slug of the open page of exactly this catalog level + brand,
 * or `null`. The most specific of `category` / `sub_category` / `item_category` is the level.
 */
const resolveSlug = (
  level: FilterPageLevel,
  id: number,
  brand: number,
  language: Language
): Promise<string | null> =>
  cached(
    `filter-page-resolve:${language}:${level}:${id}:${brand}`,
    async () => {
      const res = await fetch(`${process.env.API_URL}filter-pages/resolve/`, {
        method: 'POST',
        headers: { 'Accept-Language': language, 'Content-Type': 'application/json' },
        body: JSON.stringify({ [level]: id, brand, filters: {} })
      });
      if (!res.ok) throw new Error('filter page is not available');
      return unwrap<{ slug: string | null }>(await res.json())?.slug ?? null;
    },
    5 * MINUTES
  );

const LEVELS_BY_DEPTH: FilterPageLevel[] = ['category', 'sub_category', 'item_category'];

/** the parameters that may stand next to the brand and still leave the listing "a brand listing" */
const BRAND_LISTING_PARAMS = new Set(['brand', 'page', 'sort', 'sort_by', 'tab', 'page_size']);

/**
 * A catalog listing with a brand picked (`/catalog/…?brand=31`): when the brand has a page of its
 * own there, the listing points at it (canonical), else it is closed to search engines. `null` for
 * any other address, or one with more parameters than the brand (the filter rule of
 * `getCanonicalMetadata` decides), or when the API did not answer (nothing is guessed).
 */
export const getBrandListingCanonical = async (
  pathname: string | null,
  search: string | null
): Promise<{ canonical: string | null } | null> => {
  if (!pathname) return null;
  const params = new URLSearchParams(search ?? '');
  const brand = Number(params.get('brand'));
  if (!Number.isInteger(brand) || brand <= 0) return null;
  // a price or an attribute filter on top of the brand is not a page of its own: it stays `noindex`
  const onlyBrand = [...params.keys()].every(
    (key) => BRAND_LISTING_PARAMS.has(key) || key.startsWith('utm_')
  );
  if (!onlyBrand) return null;

  const { locale, path } = splitLocale(pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);
  const catalog = /^\/catalog\/(.+)$/.exec(path);
  if (!catalog) return null;

  try {
    const match = await matchCatalogSlugs(catalog[1].split('/').map(decodeURIComponent), locale);
    if (!match) return null;
    const level = LEVELS_BY_DEPTH[match.ids.length - 1];
    const slug = await resolveSlug(level, match.ids.at(-1)!, brand, locale);
    if (!slug) return { canonical: null };
    const page = await getFilterPage(slug, locale);
    return { canonical: page ? `${BASE_URL}${withLocale(filterPagePath(page), locale)}` : null };
  } catch {
    return null;
  }
};
