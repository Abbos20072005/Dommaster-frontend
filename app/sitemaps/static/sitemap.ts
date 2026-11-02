import type { MetadataRoute } from 'next';

import { languagePair } from '@/lib/sitemap';

/**
 * The fixed pages, each in Russian and Uzbek (`/uz/...`) with hreflang. `/requisites` (404) is not
 * listed: only the addresses that open are in the sitemap. `/pro` is not listed until it is opened
 * for the search engines (the launch day). There is no `lastmod`: a made-up date is worse than none.
 */
const PATHS = [
  '/',
  '/about',
  '/courier-delivery',
  '/payment-methods',
  '/returns',
  '/contacts',
  '/services',
  '/stores',
  '/pickup',
  '/lifting',
  '/legal-entities',
  '/oferta',
  '/privacy',
  '/privacy/partners',
  '/privacy-request',
  '/catalog',
  '/brands',
  '/blogs'
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => languagePair({ ru: path, uz: path }));
}
