import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

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
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '**'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
