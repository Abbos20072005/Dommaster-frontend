import type { getTranslations } from 'next-intl/server';

import { unstable_cache } from 'next/cache';

import { getBrands } from '@/utils/api/requests';

type Translate = Awaited<ReturnType<typeof getTranslations>>;

/** Price slider and brand list of a catalog page. */
export const getCatalogFilters = (t: Translate, brands: BrandsResponse['result']): Filter[] => [
  {
    request_var: 'price',
    type: 'SLIDER',
    name: t('Price'),
    filter_items: [],
    from: 0,
    to: 100000000
  },
  {
    name: t('Brands'),
    type: 'RADIO',
    request_var: 'brand',
    filter_items: brands.map((brand) => ({
      value: String(brand.id),
      label: brand.name
    }))
  }
];

/** Brands of several item categories, without repeats (the API takes one category per request). */
export const getBrandsOfItemCategories = async (ids: number[], language?: 'ru' | 'uz') => {
  const byId = new Map<number, Brand>();

  // a whole category has 100-180 item categories: asked in small groups, not all at once
  for (let start = 0; start < ids.length; start += 20) {
    const responses = await Promise.all(
      ids.slice(start, start + 20).map((id) =>
        getBrands({
          config: {
            params: { item_category_id: id },
            headers: language ? { 'Accept-Language': language } : undefined
          }
        })
      )
    );
    for (const brand of responses.flatMap((response) => response.data.result ?? [])) {
      byId.set(brand.id, brand);
    }
  }

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * The brands that have products in a whole category (BLD-539), kept for an hour per language: it
 * takes one request per item category. The language goes in as a header, so nothing in here reads
 * the request.
 */
export const getCachedBrandsOfCategory = unstable_cache(
  (ids: number[], language: 'ru' | 'uz') => getBrandsOfItemCategories(ids, language),
  ['brands-of-category'],
  { revalidate: 3600 }
);
