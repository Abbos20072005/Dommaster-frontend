import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import { notFound, permanentRedirect } from 'next/navigation';
import { cache } from 'react';

import { matchCatalogSlugs, toLanguage } from '@/lib/catalogTree';
import { matchFilterPage } from '@/lib/filterPages';
import { withLocale } from '@/lib/localePath';

import CategoryPage, { generateMetadata as categoryMetadata } from '../../category/[id]/page';
import SubCategoryPage, {
  generateMetadata as subCategoryMetadata
} from '../../category/[id]/[subId]/page';
import ItemCategoryPage, {
  generateMetadata as itemCategoryMetadata
} from '../../category/[id]/[subId]/[itemId]/page';
import FilterLandingPage, {
  filterLandingMetadata
} from '../_components/FilterLandingPage';

interface Props {
  params: Promise<{ slugs: string[] }>;
  /** `?page=N`: the page of the list (it is rendered on the server too) */
  searchParams: Promise<{ page?: string }>;
}

/**
 * `/catalog/{category}/{sub}/{item}` (BLD-243): the slugs are turned into ids and the page of
 * the level is shown. The slug of the other language, or any other form, leads to the right one;
 * an unknown slug is a 404.
 *
 * Else the address may be a filter landing page, `/catalog/{levels}/{slug}` (brand × category, a
 * size ...): the last slug is the page, the ones before it are the levels it belongs to.
 */
const resolve = cache(async (slugs: string[]) => {
  const decoded = slugs.map(decodeURIComponent);
  const locale = await getLocale();
  const language = toLanguage(locale);
  const match = await matchCatalogSlugs(decoded, language);

  if (!match) {
    const filterPage = await matchFilterPage(decoded, language);
    if (!filterPage) notFound();
    if (filterPage.path !== `/catalog/${decoded.join('/')}`) {
      permanentRedirect(withLocale(filterPage.path, locale));
    }
    return { page: filterPage.page, ids: [] as number[] };
  }

  // the slug of the other language leads to the one of this language, inside the same `/uz` or root
  if (match.path !== `/catalog/${decoded.join('/')}`) {
    permanentRedirect(withLocale(match.path, locale));
  }
  return { page: null, ids: match.ids };
});

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { page: filterPage, ids } = await resolve((await params).slugs);
  if (filterPage) return filterLandingMetadata(filterPage, (await searchParams)?.page);
  const [id, subId, itemId] = ids.map(String);
  if (itemId) {
    return itemCategoryMetadata({ params: Promise.resolve({ id, subId, itemId }), searchParams });
  }
  if (subId) return subCategoryMetadata({ params: Promise.resolve({ id, subId }), searchParams });
  return categoryMetadata({ params: Promise.resolve({ id }), searchParams });
}

const CatalogPage = async ({ params, searchParams }: Props) => {
  const { page: filterPage, ids } = await resolve((await params).slugs);
  if (filterPage) return <FilterLandingPage page={filterPage} searchParams={searchParams} />;
  const [id, subId, itemId] = ids.map(String);
  if (itemId) {
    return (
      <ItemCategoryPage params={Promise.resolve({ id, subId, itemId })} searchParams={searchParams} />
    );
  }
  if (subId) {
    return <SubCategoryPage params={Promise.resolve({ id, subId })} searchParams={searchParams} />;
  }
  return <CategoryPage params={Promise.resolve({ id })} searchParams={searchParams} />;
};

export default CatalogPage;
