import type { MetadataRoute } from 'next';

import { withLocale } from '@/lib/localePath';
import { BASE_URL } from '@/utils/constants';

/**
 * Products in one sitemap file (Google allows 50 000). The product API takes about 40 ms per
 * product, so a small file is built in ~10 s and does not hit a timeout.
 */
export const PRODUCTS_PER_SITEMAP = 250;

/** `lastmod` from the API `updated_at` (it comes without a time zone, so only the date is used). */
export const lastModified = (updatedAt?: string | null) => {
  const date = updatedAt?.slice(0, 10);
  return date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
};

/** The full address of a path of the site in a language: `/catalog` + uz → `…/uz/catalog`. */
export const siteUrl = (path: string, language: 'ru' | 'uz') => {
  const full = withLocale(path, language);
  return `${BASE_URL}${full === '/' ? '' : full}`;
};

type Entry = MetadataRoute.Sitemap[number];

/**
 * One page in both languages: two entries (the Russian and the Uzbek address), each naming the
 * other as its alternate (and the Russian one as `x-default`). Without the Uzbek address, only
 * the Russian entry is made.
 */
export const languagePair = (
  paths: { ru: string; uz?: string | null },
  extra: Omit<Entry, 'url' | 'alternates'> = {}
): MetadataRoute.Sitemap => {
  const ru = siteUrl(paths.ru, 'ru');
  if (!paths.uz) return [{ url: ru, ...extra }];
  const uz = siteUrl(paths.uz, 'uz');
  const alternates = { languages: { ru, uz, 'x-default': ru } };
  return [
    { url: ru, ...extra, alternates },
    { url: uz, ...extra, alternates }
  ];
};
