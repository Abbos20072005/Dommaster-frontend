import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // the private pages, the site search and the duplicates made by sorting and tabs (BLD-102)
      disallow: ['/cart', '/user/', '/checkout', '/search', '/*?sort=', '/*?sort_by=', '/*?tab=']
    },
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
