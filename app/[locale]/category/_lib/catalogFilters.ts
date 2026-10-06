import type { getTranslations } from 'next-intl/server';

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
export const getBrandsOfItemCategories = async (ids: number[]) => {
  const responses = await Promise.all(
    ids.map((id) => getBrands({ config: { params: { item_category_id: id } } }))
  );
  const byId = new Map(responses.flatMap((response) => response.data.result ?? []).map((b) => [b.id, b]));

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
};
