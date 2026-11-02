import type { Metadata } from 'next';

import {
  brandSlugById,
  catalogPathByIds,
  matchBrandSlug,
  matchCatalogSlugs,
  productSlugById
} from '@/lib/catalogTree';
import { splitLocale, withLocale } from '@/lib/localePath';
import { productIdFromParam } from '@/lib/urls';
import { BASE_URL } from '@/utils/constants';

/** The private pages and the search: not indexed, so they have no language pair. */
const NO_PAIR = /^\/(cart|checkout|search|user)(\/|$)/;

const LANGUAGES = ['ru', 'uz'] as const;

/**
 * The address of the same page in the other language. The slugs differ by language
 * (`/catalog/krepezh` ↔ `/catalog/mahkamlagichlar`), so a category, a brand and a product are
 * looked up by their id; any other page has the same path in both. `null` when the page cannot
 * be resolved (then it is a 404 and has no pair).
 */
const pathsOf = async (
  path: string,
  locale: 'ru' | 'uz'
): Promise<Record<'ru' | 'uz', string> | null> => {
  const catalog = /^\/catalog\/(.+)$/.exec(path);
  if (catalog) {
    const match = await matchCatalogSlugs(catalog[1].split('/').map(decodeURIComponent), locale);
    if (!match) return null;
    const [ru, uz] = await Promise.all(LANGUAGES.map((lang) => catalogPathByIds(match.ids, lang)));
    return ru && uz ? { ru, uz } : null;
  }

  const brand = /^\/brand\/([^/]+)$/.exec(path);
  if (brand) {
    const match = await matchBrandSlug(decodeURIComponent(brand[1]), locale);
    if (!match) return null;
    const [ru, uz] = await Promise.all(LANGUAGES.map((lang) => brandSlugById(match.id, lang)));
    return ru && uz ? { ru: `/brand/${ru}`, uz: `/brand/${uz}` } : null;
  }

  const product = /^\/product\/([^/]+)$/.exec(path);
  if (product) {
    const id = productIdFromParam(decodeURIComponent(product[1]));
    if (!id) return null;
    const [ru, uz] = await Promise.all(LANGUAGES.map((lang) => productSlugById(Number(id), lang)));
    return ru && uz ? { ru: `/product/${ru}`, uz: `/product/${uz}` } : null;
  }

  return { ru: path, uz: path };
};

/**
 * `<link rel="alternate" hreflang>` of a page: its Russian and Uzbek address and `x-default`
 * (the Russian one). A page of the list keeps its `?page=N` in both.
 */
export const getHreflang = async (
  pathname: string | null,
  search: string | null
): Promise<Pick<NonNullable<Metadata['alternates']>, 'languages'> | undefined> => {
  if (!pathname) return undefined;
  const { locale, path } = splitLocale(pathname);
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
  if (NO_PAIR.test(clean)) return undefined;

  let paths: Record<'ru' | 'uz', string> | null;
  try {
    paths = await pathsOf(clean, locale);
  } catch {
    return undefined;
  }
  if (!paths) return undefined;

  const page = Number(new URLSearchParams(search ?? '').get('page'));
  const query = page > 1 ? `?page=${page}` : '';
  const url = (language: 'ru' | 'uz') => {
    const full = withLocale(paths[language], language);
    return `${BASE_URL}${full === '/' ? '' : full}${query}`;
  };

  return { languages: { ru: url('ru'), uz: url('uz'), 'x-default': url('ru') } };
};
