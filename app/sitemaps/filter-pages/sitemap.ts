import type { MetadataRoute } from 'next';

import { filterPagePath, getFilterPageList } from '@/lib/filterPages';
import { languagePair, lastModified, siteUrl } from '@/lib/sitemap';

export const revalidate = 3600;

/**
 * The filter landing pages (brand × category, a size ...) at their Russian and Uzbek addresses.
 * The list is already the open pages only. A page is paired with its other language by its slug;
 * a page that exists in one language only is listed alone, without an alternate.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ru, uz] = await Promise.all([getFilterPageList('ru'), getFilterPageList('uz')]);
  const uzBySlug = new Map(uz.map((page) => [page.slug, page]));
  const paired = new Set<string>();

  const entries = ru.flatMap((page) => {
    const other = uzBySlug.get(page.slug);
    if (other) paired.add(page.slug);
    return languagePair(
      { ru: filterPagePath(page), uz: other ? filterPagePath(other) : null },
      { lastModified: lastModified(page.updated_at) }
    );
  });

  const uzOnly = uz
    .filter((page) => !paired.has(page.slug))
    .map((page) => ({
      url: siteUrl(filterPagePath(page), 'uz'),
      lastModified: lastModified(page.updated_at)
    }));

  return [...entries, ...uzOnly];
}
