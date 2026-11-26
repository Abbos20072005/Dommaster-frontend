import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { toLanguage } from '@/lib/catalogTree';
import type { FilterPageLevel } from '@/lib/filterPages';
import { filterPagePath, getFilterPagesOf } from '@/lib/filterPages';

/** the pages shown on a category page: the most searched first (the API sorts them so) */
const MAX_LINKS = 12;

interface Props {
  /** the catalog level of the page and its id: the filter pages of exactly that level are linked */
  level: FilterPageLevel;
  id: number;
}

/**
 * The filter pages of a category ("сухие смеси Knauf") as links above the product list: a visitor
 * and a crawler reach them from the category (they are also in the sitemap). Nothing when it has none.
 */
export const FilterPageLinks = async ({ level, id }: Props) => {
  const pages = (await getFilterPagesOf(level, id, toLanguage(await getLocale()))).slice(0, MAX_LINKS);
  if (!pages.length) return null;
  const t = await getTranslations();

  return (
    <nav aria-label={t('Popular selections')} className='flex flex-wrap gap-2'>
      {pages.map((page) => (
        <Link
          href={filterPagePath(page)}
          key={page.slug}
          prefetch={false}
          className='border-border hover:bg-muted rounded-full border bg-white px-3 py-1.5 text-xs md:text-sm'
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
};
