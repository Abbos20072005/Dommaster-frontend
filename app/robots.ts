import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // the private pages, the site search and the duplicates made by sorting and tabs (BLD-102)
      // the same rules for the Uzbek site under `/uz`
      disallow: ['', '/uz'].flatMap((prefix) =>
        ['/cart', '/user/', '/checkout', '/search'].map((path) => `${prefix}${path}`)
      ).concat(['/*?sort=', '/*?sort_by=', '/*?tab='])
    },
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
