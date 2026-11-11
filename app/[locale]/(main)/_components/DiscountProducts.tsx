import { getLocale } from 'next-intl/server';
import { unstable_cache } from 'next/cache';

import { toLanguage } from '@/lib/catalogTree';
import { getSaleMain } from '@/utils/api/requests';

import { DiscountProductsSection } from './DiscountProductsSection';

/** How many cards of the sale are drawn on the server: a row of a wide screen. */
const SERVER_PRODUCTS = 6;

/**
 * The sale of the home page, kept for a minute per language. The language goes in as a header, so
 * nothing in here reads the request.
 */
const getCachedSaleMain = unstable_cache(
  async (language: 'ru' | 'uz') => {
    const response = await getSaleMain({ config: { headers: { 'Accept-Language': language } } });
    return response.data;
  },
  ['sale-main'],
  { revalidate: 60 }
);

/**
 * The sale block with its data already in the page (BLD-395): its big background picture is in the
 * HTML, so the browser starts loading it at once instead of after the scripts and a request; the
 * block still asks the API again in the browser (the cart and favourites of the customer).
 */
export const DiscountProducts = async () => {
  const language = toLanguage(await getLocale());

  // a failed request must not break the home page: the block loads in the browser as before
  const sale = await getCachedSaleMain(language).catch(() => null);

  // only the cards that are on the screen go into the page: the rest come with the browser's own
  // request (they are out of sight, so nothing moves), and the page stays light
  const initial = sale && {
    ...sale,
    result: { ...sale.result, products: (sale.result?.products ?? []).slice(0, SERVER_PRODUCTS) }
  };

  return <DiscountProductsSection initial={initial} />;
};
