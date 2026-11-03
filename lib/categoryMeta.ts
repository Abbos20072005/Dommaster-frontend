import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { BASE_URL } from '@/utils/constants';

import { metaOverride } from './seo';

interface Options {
  /** the category, sub-category or item category */
  source: { name?: string | null; image?: string | null } | null | undefined;
  /** `?page=N` of the address (1 — the first page) */
  page: number;
}

/**
 * The title, the description and the share cards (Open Graph, Twitter) of a category page:
 * - the share cards repeat the title and the description of the page (not the ones of the site);
 * - the card has the picture of the category, or the picture of the site when it has none;
 * - from the 2nd page of the list the title and the description end with the page number.
 */
export const categoryMetadata = async ({ source, page }: Options): Promise<Metadata> => {
  const t = await getTranslations();
  const override = metaOverride(source);
  // the title written in the admin panel is used as it is (it holds the site name already)
  const ownTitle = override.title?.absolute ?? null;
  const suffix = page > 1 ? ` — ${t('metadata.page', { page })}` : '';

  const baseTitle = ownTitle ?? source?.name ?? '';
  const title = `${baseTitle}${suffix}`;
  // what the browser shows: the template adds the site to a title that has none
  const shownTitle = ownTitle ? title : `${title} - ${t('metadata.title.template')}`;
  const description = `${override.description ?? t('metadata.description')}${suffix}`;

  const image = {
    url: source?.image || `${BASE_URL}/og.jpg`,
    ...(source?.image ? {} : { width: 900, height: 600 }),
    alt: baseTitle || t('metadata.title.default')
  };

  return {
    title: ownTitle ? { absolute: title } : title,
    description,
    openGraph: { title: shownTitle, description, images: [image], type: 'website' },
    twitter: { card: 'summary_large_image', title: shownTitle, description, images: [image] }
  };
};
