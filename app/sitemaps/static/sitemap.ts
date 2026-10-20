import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

/**
 * The fixed pages. `/requisites` (404) and `/services` (no content yet) are not listed: only
 * the addresses that open are in the sitemap. There is no `lastmod`: a made-up date is worse
 * than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL },
    { url: `${BASE_URL}/about` },
    { url: `${BASE_URL}/courier-delivery` },
    { url: `${BASE_URL}/payment-methods` },
    { url: `${BASE_URL}/returns` },
    { url: `${BASE_URL}/contacts` },
    { url: `${BASE_URL}/oferta` },
    { url: `${BASE_URL}/privacy` },
    { url: `${BASE_URL}/privacy/partners` },
    { url: `${BASE_URL}/privacy-request` },
    { url: `${BASE_URL}/catalog` },
    { url: `${BASE_URL}/brands` },
    { url: `${BASE_URL}/blogs` }
  ];
}
