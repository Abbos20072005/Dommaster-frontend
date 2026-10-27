import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import { notFound, permanentRedirect } from 'next/navigation';
import { cache } from 'react';

import { matchCatalogSlugs, toLanguage } from '@/lib/catalogTree';

import CategoryPage, { generateMetadata as categoryMetadata } from '../../category/[id]/page';
import SubCategoryPage, {
  generateMetadata as subCategoryMetadata
} from '../../category/[id]/[subId]/page';
import ItemCategoryPage, {
  generateMetadata as itemCategoryMetadata
} from '../../category/[id]/[subId]/[itemId]/page';

interface Props {
  params: Promise<{ slugs: string[] }>;
}

/**
 * `/catalog/{category}/{sub}/{item}` (BLD-243): the slugs are turned into ids and the page of
 * the level is shown. The slug of the other language, or any other form, leads to the right one;
 * an unknown slug is a 404.
 */
const resolve = cache(async (slugs: string[]) => {
  const decoded = slugs.map(decodeURIComponent);
  const match = await matchCatalogSlugs(decoded, toLanguage(await getLocale()));
  if (!match) notFound();
  if (match.path !== `/catalog/${decoded.join('/')}`) permanentRedirect(match.path);
  return match.ids;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [id, subId, itemId] = (await resolve((await params).slugs)).map(String);
  if (itemId) return itemCategoryMetadata({ params: Promise.resolve({ id, subId, itemId }) });
  if (subId) return subCategoryMetadata({ params: Promise.resolve({ id, subId }) });
  return categoryMetadata({ params: Promise.resolve({ id }) });
}

const CatalogPage = async ({ params }: Props) => {
  const [id, subId, itemId] = (await resolve((await params).slugs)).map(String);
  if (itemId) return <ItemCategoryPage params={Promise.resolve({ id, subId, itemId })} />;
  if (subId) return <SubCategoryPage params={Promise.resolve({ id, subId })} />;
  return <CategoryPage params={Promise.resolve({ id })} />;
};

export default CatalogPage;
