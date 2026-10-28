import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

/**
 * The fixed pages. `/requisites` (404) is not listed: only the addresses that open are in the
 * sitemap. `/pro` is not listed until it is opened for the search engines (the launch day). There is no `lastmod`: a made-up date is worse
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
    { url: `${BASE_URL}/services` },
    { url: `${BASE_URL}/stores` },
    { url: `${BASE_URL}/pickup` },
    { url: `${BASE_URL}/lifting` },
    { url: `${BASE_URL}/legal-entities` },
    { url: `${BASE_URL}/oferta` },
    { url: `${BASE_URL}/privacy` },
    { url: `${BASE_URL}/privacy/partners` },
    { url: `${BASE_URL}/privacy-request` },
    { url: `${BASE_URL}/catalog` },
    { url: `${BASE_URL}/brands` },
    { url: `${BASE_URL}/blogs` }
  ];
}
