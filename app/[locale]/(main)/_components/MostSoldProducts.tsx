import { getLocale } from 'next-intl/server';
import { unstable_cache } from 'next/cache';

import { toLanguage } from '@/lib/catalogTree';
import { getMostSoldProducts } from '@/utils/api/requests';

import { MostSoldProductsSection } from './MostSoldProductsSection';

/** How many bestsellers are drawn on the server: the links the search engines follow. */
const SERVER_PRODUCTS = 12;

/** The bestsellers, kept for a minute per language (the language goes in as a header). */
const getCachedMostSold = unstable_cache(
  async (language: 'ru' | 'uz') => {
    const response = await getMostSoldProducts({
      config: { headers: { 'Accept-Language': language } }
    });
    return response.data;
  },
  ['most-sold'],
  { revalidate: 60 }
);

/**
 * "Хиты продаж" with its products already in the page (BLD-426): the home page is the strongest
 * page of the site, and without this its HTML had no links to these products. The block still asks
 * the API again in the browser (the cart and favourites of the customer).
 */
export const MostSoldProducts = async () => {
  const language = toLanguage(await getLocale());

  // a failed request must not break the home page: the block loads in the browser as before
  const sold = await getCachedMostSold(language).catch(() => null);
  const initial = sold && { ...sold, result: (sold.result ?? []).slice(0, SERVER_PRODUCTS) };

  return <MostSoldProductsSection initial={initial} />;
};
