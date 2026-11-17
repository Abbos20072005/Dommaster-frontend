import type { MetadataRoute } from 'next';

import { languagePair } from '@/lib/sitemap';

/**
 * The fixed pages, each in Russian and Uzbek (`/uz/...`) with hreflang. `/requisites` (404) is not
 * listed: only the addresses that open are in the sitemap. `/pro` is not listed until it is opened
 * for the search engines (the launch day).
 *
 * `lastmod` is the day the page (its code or its text in `content/trust`) was last changed in git,
 * not the day of the build: a date that moves with every deploy tells the search engine nothing.
 * Change the date here together with the page.
 */
const PAGES: [path: string, lastModified: string][] = [
  ['/', '2026-11-16'],
  ['/about', '2026-10-20'],
  ['/courier-delivery', '2026-10-19'],
  ['/payment-methods', '2026-10-19'],
  ['/returns', '2026-10-19'],
  ['/contacts', '2026-10-19'],
  ['/services', '2026-10-28'],
  ['/stores', '2026-11-10'],
  ['/pickup', '2026-10-27'],
  ['/legal-entities', '2026-10-27'],
  ['/oferta', '2026-10-19'],
  ['/privacy', '2026-10-20'],
  ['/privacy/partners', '2026-10-20'],
  ['/privacy-request', '2026-10-20'],
  ['/catalog', '2026-11-03'],
  ['/brands', '2026-11-02'],
  ['/blogs', '2026-11-16']
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(([path, lastModified]) => languagePair({ ru: path, uz: path }, { lastModified }));
}
