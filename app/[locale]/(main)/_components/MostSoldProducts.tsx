import { getLocale } from 'next-intl/server';
import { unstable_cache } from 'next/cache';

import { toLanguage } from '@/lib/catalogTree';
import { getMostSoldProducts, getProductById } from '@/utils/api/requests';

import { MostSoldProductsSection } from './MostSoldProductsSection';

/** How many bestsellers are drawn on the server: the links the search engines follow. */
const SERVER_PRODUCTS = 12;

/**
 * The bestsellers, kept for a minute per language (the language goes in as a header). The API
 * gives no `slug` for them, so it is taken from the product itself: the link then goes straight to
 * `/product/{slug}-{id}`, not through the redirect of `/product/{id}` (BLD-424).
 */
const getCachedMostSold = unstable_cache(
  async (language: 'ru' | 'uz') => {
    const headers = { 'Accept-Language': language };
    const response = await getMostSoldProducts({ config: { headers } });
    const result = await Promise.all(
      (response.data.result ?? []).slice(0, SERVER_PRODUCTS).map(async (product) => {
        if (product.slug) return product;
        const slug = await getProductById({ id: product.id, config: { headers } })
          .then((full) => full.data.result.slug)
          .catch(() => undefined);
        return { ...product, slug };
      })
    );
    return { ...response.data, result };
  },
  ['most-sold-slugs'],
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

  return <MostSoldProductsSection initial={sold} />;
};
