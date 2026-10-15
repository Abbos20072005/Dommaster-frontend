import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** The hosts the images come from: the site, the API and the host of `API_URL` (staging, local). */
const imageHosts = [
  ...new Set(
    ['buildex.uz', 'www.buildex.uz', 'api.buildex.uz']
      .concat(
        (() => {
          try {
            return process.env.API_URL ? [new URL(process.env.API_URL).hostname] : [];
          } catch {
            return [];
          }
        })()
      )
  )
];

const nextConfig: NextConfig = {
  // Metadata (title, description, canonical) is resolved before the HTML is sent for every
  // user agent: with streaming it ended up at the end of the page, where Yandex and Bing miss it.
  htmlLimitedBots: /.*/,
  env: {
    YANDEX_KEY: process.env.YANDEX_KEY,
    SUGGEST_KEY: process.env.SUGGEST_KEY,
    API_URL: process.env.API_URL
  },
  images: {
    // Images are resized for the screen and served as WebP (BLD-246). The optimizer fetches
    // them from the API server, so only the known hosts are allowed (not any URL).
    formats: ['image/webp'],
    // the optimized copy is kept for 30 days (the default is 60 seconds)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: imageHosts.flatMap((hostname) => [
      { protocol: 'https' as const, hostname, pathname: '/**' },
      ...(hostname === 'localhost' ? [{ protocol: 'http' as const, hostname, pathname: '/**' }] : [])
    ])
  }
};

export default withNextIntl(nextConfig);
